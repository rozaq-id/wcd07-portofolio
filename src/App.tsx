import './App.css';
import Layout from './components/Layout/Layout';
import Header from './components/Header/Header';
import About from './components/About/About';
import Capability from './components/Capability/Capability';
import EquipmentUsage from './components/EquipmentUsage/EquipmentUsage';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <div className="app">
      <Layout>
        <Header />
        <About />
        <Capability />
        <EquipmentUsage />
        <Contact />
        <Footer />
      </Layout>
    </div>
  );
}

export default App;
