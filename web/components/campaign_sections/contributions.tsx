import { Line } from 'react-chartjs-2';
import React, { useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ChartData,
} from 'chart.js';
import { FaFlagCheckered } from 'react-icons/fa';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export default function Contributions() {
    const [timeRange, setTimeRange] = useState<'day' | 'week' | 'month'>('day');

    // Sample data for the chart (based on the time range)
    const getDataByTimeRange = (range: 'day' | 'week' | 'month'): ChartData<"line", number[], string> => {
        switch (range) {
            case 'day':
                return {
                    labels: ['12AM', '4AM', '8AM', '12PM', '4PM', '8PM', '12AM'],
                    datasets: [
                        {
                            label: 'Donations per Hour',
                            data: [50, 120, 300, 100, 150, 200, 170],
                            borderColor: 'rgba(75, 192, 192, 1)',
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            fill: true,
                            tension: 0.4,
                        },
                    ],
                };
            case 'week':
                return {
                    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    datasets: [
                        {
                            label: 'Donations per Day',
                            data: [500, 1000, 750, 1200, 650, 900, 1300],
                            borderColor: 'rgba(75, 192, 192, 1)',
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            fill: true,
                            tension: 0.4,
                        },
                    ],
                };
            case 'month':
                return {
                    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
                    datasets: [
                        {
                            label: 'Donations per Week',
                            data: [3000, 4200, 3300, 5000],
                            borderColor: 'rgba(75, 192, 192, 1)',
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            fill: true,
                            tension: 0.4,
                        },
                    ],
                };
            default:
                return {
                    labels: [],
                    datasets: [],
                };
        }
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Donations Over Time',
            },
        },
    };

    const donations = [
        { id: 1, address: '0xAbc123...', amount: '500 SOL', milestone: 'Funded Project A' },
        { id: 2, address: '0xDef456...', amount: '300 USDC', milestone: 'Supported Milestone 2' },
        { id: 3, address: '0xGhi789...', amount: '250 SOL', milestone: 'Final Stretch Goal' },
        { id: 4, address: '0xJkl012...', amount: '800 SEND', milestone: 'Initial Seed Donation' },
    ];

    return (
        <div className="mt-8 p-4">
            <h1 className="text-3xl font-bold mb-4">Contributions</h1>

            {/* Time Range Selector */}
            <div className="mb-6">
                <button
                    onClick={() => setTimeRange('day')}
                    className={`px-4 py-2 mr-2 rounded ${timeRange === 'day' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                >
                    Day
                </button>
                <button
                    onClick={() => setTimeRange('week')}
                    className={`px-4 py-2 mr-2 rounded ${timeRange === 'week' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                >
                    Week
                </button>
                <button
                    onClick={() => setTimeRange('month')}
                    className={`px-4 py-2 rounded ${timeRange === 'month' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                >
                    Month
                </button>
            </div>

            {/* Chart Section */}
            <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
                <Line data={getDataByTimeRange(timeRange)} options={options} />
            </div>

            {/* Modern List Donation Section */}
            <div className="p-6 rounded-lg hover:shadow-xl">
                <h2 className="text-2xl font-semibold mb-4">Donation Records</h2>
                <ul className="space-y-4">
                    {donations.map((donation) => (
                        <li key={donation.id} className="flex items-center justify-between p-4 dark:bg-gray-200 rounded-md shadow-sm">
                            <div>
                                <p className="font-bold text-lg">{donation.address}</p>
                                <p className="text-green-600">{donation.amount}</p>
                            </div>
                            <p className="text-blue-600 font-semibold text-md mr-2 flex">
                                <FaFlagCheckered /> 
                                <span className='font-bold'>(<span className='text-secodary'>8</span> | <span className='text-green-700'>0</span>)</span>
                            </p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
