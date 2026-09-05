import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { TopHeader } from '../../components/TopHeader';
import { HelpCircle, Star, AlertTriangle, CheckCircle2, ArrowLeft } from 'lucide-react';

export const ClarityPollPage = () => {
  const { lectures, submitClarityPoll } = useApp();
  const location = useLocation();
  const navigate = useNavigate();

  const lectureId = location.state?.lectureId || 'LEC-104';
  const targetLecture = lectures.find(l => l.id === lectureId) || lectures[3];

  const [selectedRating, setSelectedRating] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleRatingSelect = (rating) => {
    setSelectedRating(rating);
  };

  const handleSubmitPoll = () => {
    if (!selectedRating) return;
    submitClarityPoll(targetLecture.id, selectedRating);
    setSubmitted(true);
  };

  const isLowRating = selectedRating !== null && selectedRating <= 3;

  return (
    <>
      <TopHeader title="Lecture Comprehension Poll" />
      <main className="main-content">
        <button 
          className="btn-secondary" 
          onClick={() => navigate('/student/dashboard')}
          style={{ marginBottom: '1.5rem', gap: '0.4rem' }}
        >
          <ArrowLeft size={16} /> Back to Dashboard
        </button>

        <div className="poll-container">
          <div className="poll-header">
            <div style={{ display: 'inline-flex', padding: '0.75rem', background: 'rgba(99, 102, 241, 0.15)', borderRadius: 'var(--radius-md)', color: 'var(--accent-primary)', marginBottom: '1rem' }}>
              <HelpCircle size={28} />
            </div>
            <h2 className="poll-title">How well did you understand today's lecture?</h2>
            <p className="poll-subtitle">
              Subject: <strong>{targetLecture.subject}</strong> • Faculty: {targetLecture.faculty}
            </p>
          </div>

          {!submitted ? (
            <>
              <div className="rating-grid">
                {[1, 2, 3, 4, 5].map(num => {
                  const labels = ['Unclear', 'Poor', 'Average', 'Good', 'Excellent'];
                  return (
                    <button
                      key={num}
                      className={`rating-btn ${selectedRating === num ? 'selected' : ''}`}
                      onClick={() => handleRatingSelect(num)}
                    >
                      <span className="rating-num">{num}</span>
                      <Star 
                        size={18} 
                        fill={selectedRating === num ? 'var(--accent-primary)' : 'none'} 
                        color={selectedRating === num ? 'var(--accent-primary)' : 'var(--text-muted)'} 
                      />
                      <span className="rating-label-sm">{labels[num - 1]}</span>
                    </button>
                  );
                })}
              </div>

              <button
                className="btn-primary"
                disabled={!selectedRating}
                onClick={handleSubmitPoll}
                style={{ width: '100%', padding: '0.9rem', opacity: !selectedRating ? 0.5 : 1 }}
              >
                Submit Feedback Anonymously
              </button>
            </>
          ) : (
            <div className={`poll-result-box ${isLowRating ? 'unclear' : 'clear'}`}>
              {isLowRating ? (
                <>
                  <AlertTriangle size={36} style={{ color: '#EF4444', marginBottom: '0.5rem' }} />
                  <h3 className="poll-result-title" style={{ color: '#F87171' }}>
                    Marked Unclear by 68% of Class
                  </h3>
                  <p className="poll-result-desc">
                    Your feedback has been aggregated. <strong>Flagged to CR & HOD for a mandatory doubt-clearing session!</strong>
                  </p>
                </>
              ) : (
                <>
                  <CheckCircle2 size={36} style={{ color: '#10B981', marginBottom: '0.5rem' }} />
                  <h3 className="poll-result-title" style={{ color: '#34D399' }}>
                    Lecture Marked Clear (85% Positive Score)
                  </h3>
                  <p className="poll-result-desc">
                    Thank you for voting! Your feedback helps faculty optimize future lecture pacing.
                  </p>
                </>
              )}

              <button
                className="btn-secondary"
                onClick={() => navigate('/student/dashboard')}
                style={{ marginTop: '1.5rem' }}
              >
                Return to Student Dashboard
              </button>
            </div>
          )}
        </div>
      </main>
    </>
  );
};
