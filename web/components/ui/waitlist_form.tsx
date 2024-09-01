'use client'

import { useState } from 'react';

const WaitlistForm = () => {
    const [formData, setFormData] = useState({ name: '', email: '' });
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e:any) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e:any) => {
        e.preventDefault();

        setIsLoading(true);
        // Post data to API or database
        const response = await fetch('/api/waitlist', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            setMessage('Successfully joined the waitlist!');
            setFormData({ name: '', email: '' }); // Reset form
        } else {
            setMessage('Failed to join the waitlist. Please try again.');
        }
        setIsLoading(false);
    };

    return (
        <div>
        <form onSubmit={handleSubmit} className="flex flex-col">
            {message && <p className='text-secondary'>{message}</p>}
            <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                className='px-6 py-4 rounded-md mt-5 mb-1 bg-orange-50'
                required
            />
            <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email Address"
                    className='px-6 py-4 rounded-md mb-5  bg-orange-50'
                required
            />
            {
                isLoading 
                ? (<div>Saving.....</div>)
                : (
                    <button type="submit" className="px-6 py-2 bg-gradient-to-tr from-primary to-secondary text-white rounded hover:bg-primary hover:shadow-2xl">
                        Join Waitlist
                    </button>
                )
            }
           
        </form>
        </div>
    );
};

export default WaitlistForm;
