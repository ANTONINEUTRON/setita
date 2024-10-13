export default function Proposals() {
    const proposals = [
        {
            id: 1,
            title: 'Proposal to Increase Campaign Funding',
            description: 'This proposal suggests increasing the campaign funding to support additional resources.',
            status: 'Ongoing', // or 'Concluded'
            votes: {
                yes: 120,
                no: 30
            },
            isOngoing: true // This controls whether the proposal is active or concluded
        },
        {
            id: 2,
            title: 'Proposal to Change Milestone Timeline',
            description: 'This proposal is aimed at adjusting the timeline for achieving the second milestone due to unforeseen challenges.',
            status: 'Concluded',
            votes: {
                yes: 90,
                no: 40
            },
            isOngoing: false
        }
    ];

    return (
        <div className="mt-8">
            <h1 className="text-3xl font-bold">Proposals</h1>

            {/* Tabs for Ongoing and Concluded Proposals */}
            <div role="tablist" className="tabs tabs-boxed my-8">
                <button role="tab" className="tab tab-active text-lg">Ongoing Proposals</button>
                <button role="tab" className="tab  text-lg">Concluded</button>
            </div>

            {/* List of Proposal Items */}
            <div className="space-y-6">
                {proposals.map((proposal) => (
                    <div key={proposal.id} className=" p-6 rounded-lg shadow-md ">
                        <h2 className="text-2xl font-semibold mb-2">{proposal.title}</h2>
                        <p className=" mb-4">{proposal.description}</p>

                        <div className="flex justify-between items-center mb-4">
                            <span className={`px-4 py-1 rounded-full text-white ${proposal.isOngoing ? 'bg-green-500' : 'bg-gray-400'}`}>
                                {proposal.status}
                            </span>

                            <div>
                                <span className="mr-4 font-semibold">Yes: {proposal.votes.yes}</span>
                                <span className="font-semibold">No: {proposal.votes.no}</span>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        {proposal.isOngoing && (
                            <div className="flex space-x-4">
                                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                                    Vote Now
                                </button>
                                <button className="px-4 py-2 rounded-lg ">
                                    View Details
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
