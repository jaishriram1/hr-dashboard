'use client';

import { useEffect, useState } from 'react';
import Button from './Button';
import Modal from './Modal';

export default function EmployeeTabs({ user }) {
    const [activeTab, setActiveTab] = useState('overview');
    const [feedback, setFeedback] = useState('');
    const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
    const [storedFeedback, setStoredFeedback] = useState('');

    useEffect(() => {
        const feedbacks = JSON.parse(localStorage.getItem('feedbacks') || '{}');
        if (feedbacks[user.id]) {
            setStoredFeedback(feedbacks[user.id]);
        }
    }, [user.id, isFeedbackOpen]);

    const handlePromote = () => {
        setIsFeedbackOpen(true);
    };
    const handleFeedbackSubmit = () => {
        const feedbacks = JSON.parse(localStorage.getItem('feedbacks') || '{}');
        feedbacks[user.id] = feedback;
        localStorage.setItem('feedbacks', JSON.stringify(feedbacks));
        setIsFeedbackOpen(false);
        setFeedback('');
        alert('Feedback saved!');
    };
    const tabContent = {
        overview: (
            <div>
                <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
                <p><strong>Department:</strong> {user.department}</p>
                <p><strong>Rating:</strong> ⭐ {user.rating}</p>
            </div>
        ),
        projects: (
            <div>
                <p><strong>Current Project:</strong> HR Dashboard</p>
                <p><strong>Project Status:</strong> In Progress</p>
            </div>
        ),
        feedback: (
            <div>
                <Button onClick={() => handlePromote()} className="mb-4">
                    Write Feedback
                </Button>

                <p><strong>User Feedback:</strong> {storedFeedback || 'No feedback yet.'}</p>
                <p><strong>Manager Feedback:</strong> Excellent problem-solving skills.</p>
                <p><strong>Peer Feedback:</strong> Great team player.</p>

                <Modal isOpen={isFeedbackOpen} onClose={() => setIsFeedbackOpen(false)}>
                    <h3 className="text-lg font-bold mb-2">
                        Write Feedback for {user.name ? user.name : `${user.firstName || ''} ${user.lastName || ''}`}
                    </h3>
                    <textarea
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 mb-2"
                        rows={4}
                        placeholder="Enter feedback here..."
                    />
                    <div className="flex justify-end space-x-2">
                        <Button onClick={() => setIsFeedbackOpen(false)} className="bg-gray-400 hover:bg-gray-500">Cancel</Button>
                        <Button onClick={handleFeedbackSubmit} className="bg-blue-500 hover:bg-blue-600">Save</Button>
                    </div>
                </Modal>

            </div>

        ),
    };

    return (
        <div>
            <div className="flex gap-4 border-b mb-4">
                {['overview', 'projects', 'feedback'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`capitalize pb-2 border-b-2 ${activeTab === tab ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500'
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>
            <div className="text-gray-800">{tabContent[activeTab]}</div>
        </div>
    );
}
