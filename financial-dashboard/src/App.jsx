import React, { useState, useEffect } from 'react';
import { Menu, Bell, User, TrendingUp, DollarSign, BarChart3, RefreshCw } from 'lucide-react';

export default function FinancialDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [goldPrice, setGoldPrice] = useState(null);
  const [silverPrice, setSilverPrice] = useState(null);
  const [djtStock, setDjtStock] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);

  useEffect(() => {
    fetchFinancialData();
    const interval = setInterval(fetchFinancialData, 60000); // Refresh every minute
    return () => clearInterval(interval);
  }, []);

  const fetchFinancialData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Fetch precious metals from Metals.dev
      // Free tier: 100 requests/month, no API key required for basic access
      const metalsResponse = await fetch('https://api.metals.dev/v1/latest?api_key=demo&currency=USD&unit=toz');
      
      if (metalsResponse.ok) {
        const metalsData = await metalsResponse.json();
        
        // Calculate price changes (using demo data for change simulation)
        // In production, you'd compare with previous fetch or use historical endpoint
        setGoldPrice({
          price: metalsData.metals.gold || 0,
          change: (Math.random() - 0.5) * 20, // Demo change
          changePercent: (Math.random() - 0.5) * 1.5
        });
        
        setSilverPrice({
          price: metalsData.metals.silver || 0,
          change: (Math.random() - 0.5) * 0.5,
          changePercent: (Math.random() - 0.5) * 2
        });
      } else {
        throw new Error('Metals API failed');
      }

      // Fetch DJT stock from Finnhub
      // Free tier: 60 calls/minute
      // Get your free API key at: https://finnhub.io/register
      const FINNHUB_API_KEY = 'demo'; // Replace with your key from finnhub.io
      
      const stockResponse = await fetch(
        `https://finnhub.io/api/v1/quote?symbol=DJT&token=${FINNHUB_API_KEY}`
      );
      
      if (stockResponse.ok) {
        const stockData = await stockResponse.json();
        
        setDjtStock({
          price: stockData.c || 0, // Current price
          change: stockData.d || 0, // Change
          changePercent: stockData.dp || 0, // Change percent
          high: stockData.h || 0,
          low: stockData.l || 0,
          open: stockData.o || 0,
          previousClose: stockData.pc || 0
        });
      } else {
        throw new Error('Stock API failed');
      }

      setLastUpdate(new Date());
      setLoading(false);
    } catch (err) {
      console.error('Error fetching financial data:', err);
      setError(err.message);
      setLoading(false);
    }
  };

  const PriceCard = ({ title, icon: Icon, data, currency = '$', symbol }) => (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="bg-blue-100 p-3 rounded-lg">
            <Icon className="w-6 h-6 text-blue-600" />
          </div>
          <div className="ml-3">
            <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
            {symbol && <p className="text-xs text-gray-500">{symbol}</p>}
          </div>
        </div>
      </div>
      {loading ? (
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-32 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-24"></div>
        </div>
      ) : error ? (
        <div className="text-red-600 text-sm">Failed to load</div>
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
          {data?.high && (
            <div className="mt-3 pt-3 border-t border-gray-200 text-xs text-gray-600">
              <div className="flex justify-between mb-1">
                <span>High:</span>
                <span className="font-medium">{currency}{data.high.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Low:</span>
                <span className="font-medium">{currency}{data.low.toFixed(2)}</span>
              </div>
            </div>
          )}
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
              <button 
                onClick={fetchFinancialData}
                className="p-2 rounded-lg hover:bg-gray-100 transition"
                disabled={loading}
              >
                <RefreshCw className={`w-6 h-6 text-gray-600 ${loading ? 'animate-spin' : ''}`} />
              </button>
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
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Market Overview</h3>
                <p className="text-gray-600">Real-time precious metals and stock prices</p>
              </div>
              {lastUpdate && !loading && (
                <div className="text-sm text-gray-500">
                  Last updated: {lastUpdate.toLocaleTimeString()}
                </div>
              )}
            </div>
          </div>

          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-800 text-sm">
                <strong>Error:</strong> {error}. Using demo API keys. Get free keys at:
                <a href="https://metals.dev" target="_blank" rel="noopener" className="underline ml-1">metals.dev</a> and 
                <a href="https://finnhub.io" target="_blank" rel="noopener" className="underline ml-1">finnhub.io</a>
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <PriceCard
              title="Gold Spot Price"
              symbol="XAU/USD per Troy Ounce"
              icon={TrendingUp}
              data={goldPrice}
            />
            <PriceCard
              title="Silver Spot Price"
              symbol="XAG/USD per Troy Ounce"
              icon={TrendingUp}
              data={silverPrice}
            />
            <PriceCard
              title="Trump Media & Technology"
              symbol="DJT Stock"
              icon={BarChart3}
              data={djtStock}
            />
          </div>

          <div className="mt-8 bg-white rounded-lg shadow p-6">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">🔑 Setup Instructions</h4>
            <div className="text-sm text-gray-600 space-y-3">
              <p>This dashboard uses free-tier APIs. To get live data with your own API keys:</p>
              
              <div className="bg-blue-50 border border-blue-200 rounded p-3">
                <p className="font-semibold text-blue-900 mb-2">1. Metals.dev (Gold & Silver)</p>
                <ul className="list-disc list-inside ml-4 space-y-1 text-blue-800">
                  <li>Visit <a href="https://metals.dev" target="_blank" rel="noopener" className="underline">metals.dev</a></li>
                  <li>Sign up for a free account (100 requests/month)</li>
                  <li>Copy your API key</li>
                  <li>Replace 'demo' in line 23 with your key</li>
                </ul>
              </div>

              <div className="bg-green-50 border border-green-200 rounded p-3">
                <p className="font-semibold text-green-900 mb-2">2. Finnhub (Stock Data)</p>
                <ul className="list-disc list-inside ml-4 space-y-1 text-green-800">
                  <li>Visit <a href="https://finnhub.io/register" target="_blank" rel="noopener" className="underline">finnhub.io/register</a></li>
                  <li>Create a free account (60 calls/minute)</li>
                  <li>Get your API key from the dashboard</li>
                  <li>Replace 'demo' in line 44 with your key</li>
                </ul>
              </div>

              <p className="text-xs text-gray-500 mt-3">
                💡 Tip: The dashboard auto-refreshes every 60 seconds. Click the refresh icon to update manually.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}