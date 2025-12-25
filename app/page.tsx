/**
 * Main Page (Homepage)
 * 
 * Entry point of the Decision-Based RAG Planner
 * Renders the step-by-step planning flow
 */

import PlannerFlow from './components/PlannerFlow';
import Header from './components/Header';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Header />
      <PlannerFlow />
    </div>
  );
}
