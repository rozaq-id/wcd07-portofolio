import React, { Suspense, lazy } from "react";
import "./App.css";
import Layout from "./components/Layout/Layout";
import Noise from "./components/Noise/Noise";
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import { usePerformanceMonitor } from "./hooks";

// Lazy load components for better performance
const Header = lazy(() => import("./components/Header/Header"));
const About = lazy(() => import("./components/About/About"));
const Capability = lazy(() => import("./components/Capability/Capability"));
const EquipmentUsage = lazy(
  () => import("./components/EquipmentUsage/EquipmentUsage")
);
const Contact = lazy(() => import("./components/Contact/Contact"));
const Footer = lazy(() => import("./components/Footer/Footer"));

const App: React.FC = () => {
  usePerformanceMonitor("App");

  return (
    <ErrorBoundary>
      <div className="app" role="main">
        <Noise opacity={0.15} />
        <Layout>
          <Suspense fallback={<LoadingSpinner />}>
            <Header />
            <About />
            <Capability />
            <EquipmentUsage />
            <Contact />
            <Footer />
          </Suspense>
        </Layout>
      </div>
    </ErrorBoundary>
  );
};

export default App;
