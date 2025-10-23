import React, { useState, useEffect } from 'react';
import { Menu, Bell, User, TrendingUp, DollarSign, BarChart3 } from 'lucide-react';

export default function FinancialDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [goldPrice, setGoldPrice] = useState(null);
  const [silverPrice, setSilverPrice] = useState(null);
  const [djtStock, setDjtStock] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFinancialData();
    const interval = setInterval(fetchFinancialData, 60000); // Refresh every minute
    return () => clearInterval(interval);
  }, []);

  const fetchFinancialData = async () => {
    try {
      // Note: These are example endpoints. You'll need to replace with actual API keys/endpoints
      // For gold/silver: Consider using APIs like metals.live, metalpriceapi.com, or goldapi.io
      // For stocks: Consider using APIs like Alpha Vantage, Finnhub, or Yahoo Finance
      
      // Placeholder data for demonstration
      setGoldPrice({ price: 2031.45, change: 12.30, changePercent: 0.61 });
      setSilverPrice({ price: 24.87, change: -0.15, changePercent: -0.60 });
      setDjtStock({ price: 16.75, change: 0.42, changePercent: 2.57 });
      setLoading(false);
    } catch (error) {
      console.error('Error fetching financial data:', error);
      setLoading(false);
    }
  };

  const PriceCard = ({ title, icon: Icon, data, currency = '$' }) => (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="bg-blue-100 p-3 rounded-lg">
            <Icon className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="ml-3 text-lg font-semibold text-gray-800">{title}</h3>
        </div>
      </div>
      {loading ? (
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-32 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-24"></div>
        </div>
      ) : (
        <>
          <div className="text-3xl font-bold text-gray-900 mb-2">
            {currency}{data?.price.toFixed(2)}
          </div>
          <div className={`flex items-center text-sm ${data?.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            <span className="font-medium">
              {data?.change >= 0 ? '+' : ''}{data?.change.toFixed(2)} ({data?.changePercent >= 0 ? '+' : ''}{data?.changePercent.toFixed(2)}%)
            </span>
          </div>
        </>
      )}
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-0'} bg-gray-900 text-white transition-all duration-300 overflow-hidden flex-shrink-0`}>
        <div className="p-4">
          <h1 className="text-xl font-bold mb-8">Financial Hub</h1>
          <nav className="space-y-2">
            <a href="#" className="flex items-center px-4 py-3 bg-blue-600 rounded-lg">
              <BarChart3 className="w-5 h-5 mr-3" />
              Dashboard
            </a>
            <a href="#" className="flex items-center px-4 py-3 hover:bg-gray-800 rounded-lg transition">
              <TrendingUp className="w-5 h-5 mr-3" />
              Markets
            </a>
            <a href="#" className="flex items-center px-4 py-3 hover:bg-gray-800 rounded-lg transition">
              <DollarSign className="w-5 h-5 mr-3" />
              Portfolio
            </a>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Admin Bar */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 transition"
              >
                <Menu className="w-6 h-6 text-gray-600" />
              </button>
              <h2 className="ml-4 text-xl font-semibold text-gray-800">Dashboard</h2>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-lg hover:bg-gray-100 transition relative">
                <Bell className="w-6 h-6 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition">
                <User className="w-6 h-6 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">Admin</span>
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-auto p-6">
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Market Overview</h3>
            <p className="text-gray-600">Real-time precious metals and stock prices</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <PriceCard
              title="Gold Spot Price"
              icon={TrendingUp}
              data={goldPrice}
            />
            <PriceCard
              title="Silver Spot Price"
              icon={TrendingUp}
              data={silverPrice}
            />
            <PriceCard
              title="TMTG/DJT Stock"
              icon={BarChart3}
              data={djtStock}
            />
          </div>

          <div className="mt-8 bg-white rounded-lg shadow p-6">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">API Integration Notes</h4>
            <div className="text-sm text-gray-600 space-y-2">
              <p>To get live data, you'll need to integrate with financial APIs:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li><strong>Precious Metals:</strong> metals.live, goldapi.io, or metalpriceapi.com</li>
                <li><strong>Stock Data:</strong> Alpha Vantage, Finnhub, or Polygon.io</li>
              </ul>
              <p className="mt-3">Current display shows placeholder data. Replace the fetchFinancialData function with actual API calls.</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}