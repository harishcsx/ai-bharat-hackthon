import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface MemberData {
    name: string;
    email: string;
    phoneNo: string;
    rollNo: string;
    section: string;
    hostelNo: string;
}

export const RegisterTeam: React.FC = () => {
    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const [teamName, setTeamName] = useState('');
    const [leader, setLeader] = useState<MemberData>({
        name: '', email: '', phoneNo: '', rollNo: '', section: '', hostelNo: ''
    });

    // Initialize with 1 teammate (minimum requirement)
    const [teammates, setTeammates] = useState<MemberData[]>([
        { name: '', email: '', phoneNo: '', rollNo: '', section: '', hostelNo: '' }
    ]);

    const handleNext = () => setStep(s => Math.min(s + 1, 3));
    const handleBack = () => setStep(s => Math.max(s - 1, 1));

    const addTeammate = () => {
        if (teammates.length < 3) {
            setTeammates([...teammates, { name: '', email: '', phoneNo: '', rollNo: '', section: '', hostelNo: '' }]);
        }
    };

    const removeTeammate = (index: number) => {
        if (teammates.length > 1) { // Min 1 teammate allowed
            setTeammates(teammates.filter((_, i) => i !== index));
        }
    };

    const updateLeader = (field: keyof MemberData, value: string) => {
        setLeader({ ...leader, [field]: value });
    };

    const updateTeammate = (index: number, field: keyof MemberData, value: string) => {
        const updated = [...teammates];
        updated[index] = { ...updated[index], [field]: value };
        setTeammates(updated);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (step < 3) return handleNext();

        setError(null);
        setIsLoading(true);

        try {
            // API call to registration endpoint (mocked for now)
            console.log('Registering Data:', { teamName, leader, teammates });

            setTimeout(() => {
                setIsLoading(false);
                navigate('/login');
            }, 1500);

        } catch (err: any) {
            setError(err.response?.data?.error || 'Registration failed');
            setIsLoading(false);
        }
    };

    const renderMemberFields = (member: MemberData, onChange: (field: keyof MemberData, val: string) => void) => (
        <>
            <div className="form-row">
                <div className="form-group">
                    <label>Full Name *</label>
                    <input type="text" value={member.name} onChange={e => onChange('name', e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>University Email *</label>
                    <input type="email" value={member.email} onChange={e => onChange('email', e.target.value)} required />
                </div>
            </div>
            <div className="form-row">
                <div className="form-group">
                    <label>Roll Number *</label>
                    <input type="text" value={member.rollNo} onChange={e => onChange('rollNo', e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Phone Number *</label>
                    <input type="tel" value={member.phoneNo} onChange={e => onChange('phoneNo', e.target.value)} required />
                </div>
            </div>
            <div className="form-row">
                <div className="form-group">
                    <label>Section *</label>
                    <input type="text" value={member.section} onChange={e => onChange('section', e.target.value)} placeholder="e.g. CSE-A" required />
                </div>
                <div className="form-group">
                    <label>Hostel Number (Optional)</label>
                    <input type="text" value={member.hostelNo} onChange={e => onChange('hostelNo', e.target.value)} />
                </div>
            </div>
        </>
    );

    return (
        <div className="auth-container">
            <div className="auth-card wide">
                <div className="auth-header">
                    <h2>Register Your Team</h2>
                    <p>Join the Build Bharat Hackathon 2026. (2-4 Members required)</p>
                </div>

                {error && <div className="alert alert-error">{error}</div>}

                <div className="form-steps">
                    <div className={`step-indicator ${step >= 1 ? 'active' : ''} ${step > 1 ? 'completed' : ''}`}>1</div>
                    <div className={`step-indicator ${step >= 2 ? 'active' : ''} ${step > 2 ? 'completed' : ''}`}>2</div>
                    <div className={`step-indicator ${step >= 3 ? 'active' : ''}`}>3</div>
                </div>

                <form onSubmit={handleSubmit} className="auth-form">
                    {/* STEP 1: Team & Leader Details */}
                    {step === 1 && (
                        <div className="step-content fadeIn">
                            <h3 style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
                                Team & Leader Details
                            </h3>
                            <div className="form-group" style={{ marginBottom: '2rem' }}>
                                <label>Team Name (must be unique) *</label>
                                <input
                                    type="text"
                                    value={teamName}
                                    onChange={e => setTeamName(e.target.value)}
                                    placeholder="e.g. Byte Bandits"
                                    required
                                />
                            </div>

                            <h4 style={{ marginBottom: '1rem', color: 'var(--accent-primary)' }}>Team Leader Profile</h4>
                            {renderMemberFields(leader, updateLeader)}
                        </div>
                    )}

                    {/* STEP 2: Teammates */}
                    {step === 2 && (
                        <div className="step-content fadeIn">
                            <h3 style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
                                Teammates Details
                            </h3>

                            {teammates.map((teammate, index) => (
                                <div key={index} style={{ marginBottom: '2rem', padding: '1.5rem', background: 'var(--bg-primary)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                        <h4 style={{ color: 'var(--text-primary)' }}>Teammate {index + 1}</h4>
                                        {teammates.length > 1 && (
                                            <button type="button" onClick={() => removeTeammate(index)} style={{ background: 'none', border: 'none', color: 'var(--danger)', cursor: 'pointer', fontSize: '0.875rem' }}>
                                                Remove
                                            </button>
                                        )}
                                    </div>
                                    {renderMemberFields(teammate, (f, v) => updateTeammate(index, f, v))}
                                </div>
                            ))}

                            {teammates.length < 3 && (
                                <button type="button" onClick={addTeammate} className="btn btn-outline" style={{ borderStyle: 'dashed', width: '100%', padding: '1rem' }}>
                                    + Add Another Teammate (Max 3)
                                </button>
                            )}
                        </div>
                    )}

                    {/* STEP 3: Review */}
                    {step === 3 && (
                        <div className="step-content fadeIn">
                            <h3 style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
                                Review Team Registration
                            </h3>

                            <div style={{ background: 'var(--bg-primary)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                                <p><strong>Team Name:</strong> {teamName}</p>
                                <p><strong>Leader:</strong> {leader.name} ({leader.rollNo})</p>
                                <p><strong>Total Members:</strong> {1 + teammates.length}/4</p>
                                <div style={{ marginTop: '1rem', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                                        By submitting this form, you verify that all details provided are accurate. Duplicate Roll numbers or Emails will result in registration failure.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="form-actions">
                        {step > 1 ? (
                            <button type="button" onClick={handleBack} className="btn btn-outline" disabled={isLoading}>
                                Back
                            </button>
                        ) : <div></div>}

                        <button type="submit" className="btn btn-primary" disabled={isLoading}>
                            {step < 3 ? 'Next Step' : (isLoading ? 'Submitting...' : 'Complete Registration')}
                        </button>
                    </div>
                </form>

                <div className="auth-footer" style={{ marginTop: '1.5rem', paddingTop: '1rem' }}>
                    <p>Already registered? <a href="/login" className="auth-link">Login here</a></p>
                </div>
            </div>
        </div>
    );
};
