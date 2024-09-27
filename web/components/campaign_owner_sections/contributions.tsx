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

    // Sample data for the table (you can replace it with real data)
    const donations = [
        { id: 1, address: '0xAbc123...', amount: '500 SOL' },
        { id: 2, address: '0xDef456...', amount: '300 USDC' },
        { id: 3, address: '0xGhi789...', amount: '250 SOL' },
        { id: 4, address: '0xJkl012...', amount: '800 SEND' },
    ];

    return (
        <div className="mt-8 p-4">
            <h1 className="text-3xl font-bold mb-4">Dashboard</h1>

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

            {/* Table Section */}
            <div className=" p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold mb-4">Donation Records</h2>
                <table className="min-w-full table-auto border-none">
                    <thead>
                        <tr className="bg-primary text-white">
                            <th className="p-2">S/N</th>
                            <th className="p-2">Address</th>
                            <th className="p-2">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {donations.map((donation) => (
                            <tr key={donation.id} className="text-center">
                                <td className="p-2">{donation.id}</td>
                                <td className="p-2">{donation.address}</td>
                                <td className="p-2">{donation.amount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
