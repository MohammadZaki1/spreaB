import React, { useState, useEffect } from "react";
import Header from "../components/Navbar";
import {
  Wallet,
  CreditCard,
  TrendingUp,
  Clock,
  CheckCircle2,
  ArrowUpCircle,
  ArrowDownCircle,
  Plus,
  Download,
  Filter,
  Search,
  ChevronRight,
  Shield,
  Sparkles,
  Repeat,
  History,
  Receipt,
  BarChart3,
  Users,
  DollarSign,
  Calendar,
  Send,
  Loader2,
  AlertCircle,
  Check,
  X,
  Eye,
  FileText,
  Coins,
  Gift,
  ShoppingBag,
  RefreshCw,
  PieChart
} from "lucide-react";

const WalletPage = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showBuySticksModal, setShowBuySticksModal] = useState(false);
  const [showSpendSticksModal, setShowSpendSticksModal] = useState(false);
  const [showTransactionDetails, setShowTransactionDetails] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });
  
  // State variables for modals
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [selectedInfluencer, setSelectedInfluencer] = useState("");
  const [purpose, setPurpose] = useState("");
  
  // Core Stick State
  const [stickBalance, setStickBalance] = useState({
    total: 8450,
    free: 2450,
    purchased: 6000,
    spentThisMonth: 24750,
    reserved: 4800,
    pending: 2700,
  });

  const [stickBreakdown, setStickBreakdown] = useState({
    promotions: 18750,
    refunds: 1450,
    fees: 550,
    bonuses: 3000,
  });

  // Transaction filters
  const [selectedFilters, setSelectedFilters] = useState({
    stickSource: "all",
    transactionType: "all",
    dateRange: "month"
  });

  // Mock transactions
  const initialTransactions = [
    {
      id: 1,
      type: "spend",
      stickSource: "purchased",
      name: "Promotion Post - Sarah Johnson",
      description: "Beauty product launch promotion",
      date: "Today, 10:30 AM",
      timestamp: new Date(),
      sticks: "-800 Sticks",
      sticksValue: 800,
      status: "completed",
      category: "Promotion Post",
      avatar: "SJ",
      influencerName: "Sarah Johnson",
      promotion: "Summer Skincare Launch",
      platform: "Instagram",
      remainingBalance: 7650
    },
    {
      id: 2,
      type: "purchase",
      stickSource: "purchased",
      name: "Stick Purchase",
      description: "Bought 5,000 sticks via Credit Card •••• 4567",
      date: "Yesterday, 2:15 PM",
      timestamp: new Date(Date.now() - 86400000),
      sticks: "+5,000 Sticks",
      sticksValue: 5000,
      status: "completed",
      category: "Purchase",
      avatar: "PC",
      paymentMethod: "Credit Card",
      unitPrice: "$0.10 per stick",
      totalCost: "$500.00",
      remainingBalance: 8450
    },
    {
      id: 3,
      type: "bonus",
      stickSource: "free",
      name: "Welcome Bonus Sticks",
      description: "New campaign setup bonus",
      date: "Jan 18, 2024",
      timestamp: new Date("2024-01-18"),
      sticks: "+1,000 Sticks",
      sticksValue: 1000,
      status: "completed",
      category: "Bonus",
      avatar: "FC",
      reason: "New Campaign Welcome Bonus",
      remainingBalance: 3450
    },
    {
      id: 4,
      type: "hold",
      stickSource: "purchased",
      name: "Sticks Reserved for Campaign",
      description: "Fashion week Instagram campaign",
      date: "Jan 16, 2024",
      timestamp: new Date("2024-01-16"),
      sticks: "-2,500 Sticks",
      sticksValue: 2500,
      status: "pending",
      category: "Budget Hold",
      avatar: "FW",
      promotion: "Fashion Week Campaign",
      releaseDate: "Jan 30, 2024",
      remainingBalance: 5950
    },
    {
      id: 5,
      type: "refund",
      stickSource: "refund",
      name: "Promotion Refund",
      description: "Cancelled influencer collaboration - partial refund",
      date: "Jan 15, 2024",
      timestamp: new Date("2024-01-15"),
      sticks: "+450 Sticks",
      sticksValue: 450,
      status: "completed",
      category: "Refund",
      avatar: "RF",
      originalPayment: "950 Sticks",
      refundReason: "Schedule Conflict",
      remainingBalance: 5450
    },
    {
      id: 6,
      type: "spend",
      stickSource: "free",
      name: "Promotion Post - Emma Wilson",
      description: "Lifestyle vlog sponsorship",
      date: "Jan 14, 2024",
      timestamp: new Date("2024-01-14"),
      sticks: "-1,500 Sticks",
      sticksValue: 1500,
      status: "completed",
      category: "Promotion Post",
      avatar: "EW",
      influencerName: "Emma Wilson",
      promotion: "Lifestyle Content",
      platform: "YouTube",
      remainingBalance: 3950
    }
  ];

  // Wallet Stats
  const walletStats = [
    {
      title: "Total Available Sticks",
      value: `${stickBalance.total.toLocaleString('en-US')} Sticks`,
      breakdown: `Free: ${stickBalance.free.toLocaleString('en-US')} | Purchased: ${stickBalance.purchased.toLocaleString('en-US')}`,
      icon: Coins,
      color: "from-amber-500 to-orange-600",
      description: "Ready to spend on promotions"
    },
    {
      title: "Free Sticks Balance",
      value: `${stickBalance.free.toLocaleString('en-US')} Sticks`,
      change: "+1,000 this month",
      icon: Gift,
      color: "from-green-500 to-emerald-600",
      description: "From bonuses & rewards"
    },
    {
      title: "Purchased Sticks",
      value: `${stickBalance.purchased.toLocaleString('en-US')} Sticks`,
      change: "Last: 5,000 sticks",
      icon: ShoppingBag,
      color: "from-blue-500 to-cyan-600",
      description: "Bought with real money"
    },
    {
      title: "Sticks Spent (This Month)",
      value: `${stickBalance.spentThisMonth.toLocaleString('en-US')} Sticks`,
      change: "24 promotions",
      icon: TrendingUp,
      color: "from-purple-500 to-pink-600",
      description: "On active promotions"
    }
  ];

  // Quick Actions
  const quickActions = [
    {
      id: 1,
      label: "Buy More Sticks",
      icon: Plus,
      color: "bg-gradient-to-r from-blue-600 to-cyan-600",
      description: "Add purchased sticks",
      onClick: () => setShowBuySticksModal(true)
    },
    {
      id: 2,
      label: "Spend Sticks",
      icon: Send,
      color: "bg-gradient-to-r from-purple-600 to-pink-600",
      description: "Post a promotion",
      onClick: () => setShowSpendSticksModal(true)
    },
    {
      id: 3,
      label: "Get Free Sticks",
      icon: Gift,
      color: "bg-gradient-to-r from-green-600 to-emerald-600",
      description: "Earn bonus sticks",
      onClick: () => handleEarnFreeSticks()
    },
    {
      id: 4,
      label: "Export Report",
      icon: Download,
      color: "bg-gradient-to-r from-amber-600 to-orange-600",
      description: "Download CSV/PDF",
      onClick: () => handleExportReport()
    }
  ];

  // Filter logic
  useEffect(() => {
    let filtered = initialTransactions;
    
    if (selectedFilters.stickSource !== "all") {
      filtered = filtered.filter(t => t.stickSource === selectedFilters.stickSource);
    }
    
    if (selectedFilters.transactionType !== "all") {
      filtered = filtered.filter(t => t.type === selectedFilters.transactionType);
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(transaction => 
        transaction.name.toLowerCase().includes(query) ||
        transaction.description.toLowerCase().includes(query) ||
        transaction.category.toLowerCase().includes(query)
      );
    }
    
    setFilteredTransactions(filtered);
  }, [selectedFilters, searchQuery]);

  useEffect(() => {
    setTimeout(() => {
      setTransactions(initialTransactions);
      setFilteredTransactions(initialTransactions);
      setLoading(false);
    }, 800);
  }, []);

  // Toast notification
  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: "", type: "success" });
    }, 3000);
  };

  // Handle buying sticks
  const handleBuySticks = () => {
    if (!amount || parseInt(amount) <= 0) {
      showToast("Please enter a valid number of sticks", "error");
      return;
    }
    
    const addedSticks = parseInt(amount);
    const cost = (addedSticks * 0.10).toFixed(2);
    
    // Update balances
    setStickBalance(prev => ({
      ...prev,
      total: prev.total + addedSticks,
      purchased: prev.purchased + addedSticks
    }));
    
    // Add transaction
    const newTransaction = {
      id: transactions.length + 1,
      type: "purchase",
      stickSource: "purchased",
      name: "Stick Purchase",
      description: `Bought ${addedSticks.toLocaleString()} sticks via ${paymentMethod}`,
      date: "Just now",
      timestamp: new Date(),
      sticks: `+${addedSticks.toLocaleString()} Sticks`,
      sticksValue: addedSticks,
      status: "completed",
      category: "Purchase",
      avatar: "PC",
      paymentMethod: paymentMethod === "card" ? "Credit Card" : "Bank Transfer",
      unitPrice: "$0.10 per stick",
      totalCost: `$${cost}`,
      remainingBalance: stickBalance.total + addedSticks
    };
    
    setTransactions(prev => [newTransaction, ...prev]);
    showToast(`Successfully purchased ${addedSticks.toLocaleString()} sticks for $${cost}!`, "success");
    setShowBuySticksModal(false);
    setAmount("");
  };

  // Handle spending sticks
  const handleSpendSticks = () => {
    if (!amount || parseInt(amount) <= 0) {
      showToast("Please enter a valid number of sticks", "error");
      return;
    }
    
    const sticksToSpend = parseInt(amount);
    let stickSource = "purchased";
    
    // Use free sticks first if available
    if (stickBalance.free >= sticksToSpend) {
      stickSource = "free";
      setStickBalance(prev => ({
        ...prev,
        free: prev.free - sticksToSpend
      }));
    } else if (stickBalance.free > 0) {
      const freeUsed = stickBalance.free;
      const purchasedUsed = sticksToSpend - freeUsed;
      stickSource = "mixed";
      
      setStickBalance(prev => ({
        ...prev,
        free: 0,
        purchased: prev.purchased - purchasedUsed
      }));
    } else {
      setStickBalance(prev => ({
        ...prev,
        purchased: prev.purchased - sticksToSpend
      }));
    }
    
    // Update total and spent this month
    setStickBalance(prev => ({
      ...prev,
      total: prev.total - sticksToSpend,
      spentThisMonth: prev.spentThisMonth + sticksToSpend
    }));
    
    // Add transaction
    const newTransaction = {
      id: transactions.length + 1,
      type: "spend",
      stickSource: stickSource,
      name: `Promotion - ${selectedInfluencer || "Unknown"}`,
      description: purpose || "Promotion posting",
      date: "Just now",
      timestamp: new Date(),
      sticks: `-${sticksToSpend.toLocaleString()} Sticks`,
      sticksValue: sticksToSpend,
      status: "completed",
      category: "Promotion Post",
      avatar: "SP",
      influencerName: selectedInfluencer,
      promotion: purpose,
      remainingBalance: stickBalance.total - sticksToSpend
    };
    
    setTransactions(prev => [newTransaction, ...prev]);
    showToast(`Posted promotion using ${sticksToSpend.toLocaleString()} sticks!`, "success");
    setShowSpendSticksModal(false);
    resetSpendForm();
  };

  const resetSpendForm = () => {
    setAmount("");
    setSelectedInfluencer("");
    setPurpose("");
  };

  // Handler functions
  const handleEarnFreeSticks = () => {
    showToast("Showing ways to earn free sticks", "info");
  };

  const handleExportReport = () => {
    showToast("Exporting wallet report...", "success");
  };

  const handleViewAllTransactions = () => {
    setActiveTab("all");
    setSearchQuery("");
    setSelectedFilters({
      stickSource: "all",
      transactionType: "all",
      dateRange: "all"
    });
    showToast("Showing all stick transactions", "info");
  };

  // ADDED: Missing handler function
  const handleViewDetails = (transaction) => {
    setSelectedTransaction(transaction);
    setShowTransactionDetails(true);
    showToast(`Viewing details for: ${transaction.name}`, "info");
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
        <Header />
        <div className="max-w-6xl mx-auto mt-28 px-4 sm:px-6 lg:px-8 py-8 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
            <p className="text-gray-600">Loading stick wallet...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      <Header />
      
      {/* Toast Notification */}
      {toast.show && (
        <div className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-xl shadow-lg flex items-center gap-3 animate-fade-in ${
          toast.type === "success" ? "bg-green-500 text-white" : 
          toast.type === "error" ? "bg-red-500 text-white" : 
          "bg-blue-500 text-white"
        }`}>
          {toast.type === "success" ? <Check className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
          <span className="font-medium">{toast.message}</span>
          <button onClick={() => setToast({ show: false, message: "", type: "success" })}>
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Buy Sticks Modal */}
      {showBuySticksModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full animate-slide-up">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">Buy Sticks</h3>
              <button 
                onClick={() => setShowBuySticksModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Sticks
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="px-4 py-3 w-full border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="0"
                    min="1"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Payment Method
                </label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="card">Credit/Debit Card (•••• 4567)</option>
                  <option value="bank">Bank Transfer</option>
                </select>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[100, 500, 1000, 5000, 10000, 20000].map((amt) => (
                  <button
                    key={amt}
                    onClick={() => setAmount(amt.toString())}
                    className="py-2 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors active:scale-95"
                  >
                    {amt} Sticks
                  </button>
                ))}
              </div>
              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                  <span>Current Balance</span>
                  <span className="font-bold">{stickBalance.total.toLocaleString('en-US')} Sticks</span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>Cost</span>
                  <span className="font-bold text-gray-900">
                    ${amount ? (parseInt(amount) * 0.10).toFixed(2) : "0.00"}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600 mt-2">
                  <span>New Balance</span>
                  <span className="font-bold text-green-600">
                    {amount ? (stickBalance.total + parseInt(amount)).toLocaleString('en-US') : stickBalance.total.toLocaleString('en-US')} Sticks
                  </span>
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowBuySticksModal(false)}
                  className="flex-1 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 font-medium transition-colors active:scale-95"
                >
                  Cancel
                </button>
                <button
                  onClick={handleBuySticks}
                  className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl hover:shadow-lg font-medium transition-all active:scale-95"
                >
                  Buy Sticks
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Spend Sticks Modal */}
      {showSpendSticksModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full animate-slide-up">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">Spend Sticks on Promotion</h3>
              <button 
                onClick={() => setShowSpendSticksModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Sticks
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="px-4 py-3 w-full border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="0"
                    min="1"
                  />
                  <div className="text-xs text-gray-500 mt-1">
                    Available: {stickBalance.total.toLocaleString('en-US')} Sticks
                    {stickBalance.free > 0 && ` (${stickBalance.free.toLocaleString('en-US')} free sticks available)`}
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Influencer
                </label>
                <select
                  value={selectedInfluencer}
                  onChange={(e) => setSelectedInfluencer(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                >
                  <option value="">Select an influencer</option>
                  <option value="Sarah Johnson">Sarah Johnson - Beauty (800 Sticks/post)</option>
                  <option value="Mike Chen">Mike Chen - Tech (1,200 Sticks/video)</option>
                  <option value="Emma Wilson">Emma Wilson - Lifestyle (1,500 Sticks/post)</option>
                  <option value="Alex Rodriguez">Alex Rodriguez - Gaming (900 Sticks/stream)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Promotion Purpose
                </label>
                <textarea
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="Describe the promotion..."
                  rows="3"
                />
              </div>
              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                  <span>Current Balance</span>
                  <span className="font-bold">{stickBalance.total.toLocaleString('en-US')} Sticks</span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                  <span>Sticks to Spend</span>
                  <span className="font-bold text-red-600">-{amount || "0"} Sticks</span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>New Balance</span>
                  <span className="font-bold text-green-600">
                    {amount ? (stickBalance.total - parseInt(amount)).toLocaleString('en-US') : stickBalance.total.toLocaleString('en-US')} Sticks
                  </span>
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowSpendSticksModal(false)}
                  className="flex-1 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 font-medium transition-colors active:scale-95"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSpendSticks}
                  className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:shadow-lg font-medium transition-all active:scale-95"
                >
                  Post Promotion
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Transaction Details Modal */}
      {showTransactionDetails && selectedTransaction && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full animate-slide-up">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">Transaction Details</h3>
              <button 
                onClick={() => setShowTransactionDetails(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className={`p-4 rounded-xl flex items-center gap-4 ${
                selectedTransaction.type === 'spend' ? 'bg-red-50' :
                selectedTransaction.type === 'purchase' ? 'bg-green-50' :
                selectedTransaction.type === 'bonus' ? 'bg-emerald-50' :
                selectedTransaction.type === 'refund' ? 'bg-purple-50' :
                'bg-amber-50'
              }`}>
                <div className={`p-3 rounded-lg ${
                  selectedTransaction.type === 'spend' ? 'bg-red-100' :
                  selectedTransaction.type === 'purchase' ? 'bg-green-100' :
                  selectedTransaction.type === 'bonus' ? 'bg-emerald-100' :
                  selectedTransaction.type === 'refund' ? 'bg-purple-100' :
                  'bg-amber-100'
                }`}>
                  {selectedTransaction.type === 'spend' ? (
                    <ArrowUpCircle className="w-6 h-6 text-red-600" />
                  ) : selectedTransaction.type === 'purchase' ? (
                    <ArrowDownCircle className="w-6 h-6 text-green-600" />
                  ) : selectedTransaction.type === 'bonus' ? (
                    <Gift className="w-6 h-6 text-emerald-600" />
                  ) : selectedTransaction.type === 'refund' ? (
                    <RefreshCw className="w-6 h-6 text-purple-600" />
                  ) : (
                    <Clock className="w-6 h-6 text-amber-600" />
                  )}
                </div>
                <div>
                  <p className={`text-2xl font-bold ${
                    selectedTransaction.sticks.startsWith('+') ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {selectedTransaction.sticks}
                  </p>
                  <p className="text-gray-600">{selectedTransaction.category}</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Transaction Name</p>
                  <p className="font-medium">{selectedTransaction.name}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Description</p>
                  <p className="font-medium">{selectedTransaction.description}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Date & Time</p>
                    <p className="font-medium">{selectedTransaction.date}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <span className={`px-3 py-1 text-sm rounded-full ${
                      selectedTransaction.status === 'completed' ? 'bg-green-100 text-green-700' :
                      selectedTransaction.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {selectedTransaction.status}
                    </span>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Stick Source</p>
                  <span className={`px-3 py-1 text-sm rounded-full ${
                    selectedTransaction.stickSource === 'free' ? 'bg-green-100 text-green-700' :
                    selectedTransaction.stickSource === 'purchased' ? 'bg-blue-100 text-blue-700' :
                    selectedTransaction.stickSource === 'refund' ? 'bg-purple-100 text-purple-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {selectedTransaction.stickSource} sticks
                  </span>
                </div>
                
                {selectedTransaction.influencerName && (
                  <div>
                    <p className="text-sm text-gray-500">Influencer</p>
                    <p className="font-medium">{selectedTransaction.influencerName}</p>
                  </div>
                )}
                
                {selectedTransaction.platform && (
                  <div>
                    <p className="text-sm text-gray-500">Platform</p>
                    <p className="font-medium">{selectedTransaction.platform}</p>
                  </div>
                )}
                
                {selectedTransaction.promotion && (
                  <div>
                    <p className="text-sm text-gray-500">Promotion</p>
                    <p className="font-medium">{selectedTransaction.promotion}</p>
                  </div>
                )}
                
                {selectedTransaction.remainingBalance && (
                  <div>
                    <p className="text-sm text-gray-500">Balance After Transaction</p>
                    <p className="font-medium">{selectedTransaction.remainingBalance.toLocaleString()} Sticks</p>
                  </div>
                )}
              </div>
              
              <button
                onClick={() => setShowTransactionDetails(false)}
                className="w-full mt-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl hover:shadow-lg font-medium transition-all active:scale-95"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content - Vertical Layout */}
      <div className="max-w-6xl mx-auto mt-28 px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl shadow-lg">
                <Coins className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Promotion Sticks Wallet
                </h1>
                <p className="text-gray-600">
                  Track your stick balance, spending, and promotion budget
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <button 
              onClick={() => setShowBuySticksModal(true)}
              className="px-5 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl hover:shadow-xl hover:shadow-blue-200 transition-all flex items-center gap-2 font-medium shadow-lg active:scale-95"
            >
              <Plus className="w-5 h-5" />
              Buy Sticks
            </button>
            <button 
              onClick={() => setShowSpendSticksModal(true)}
              className="px-5 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:shadow-xl hover:shadow-purple-200 transition-all flex items-center gap-2 font-medium shadow-lg active:scale-95"
            >
              <Send className="w-5 h-5" />
              Spend Sticks
            </button>
          </div>
        </div>

        {/* Wallet Stats - Single Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {walletStats.map((stat, index) => (
            <div
              key={index}
              className={`bg-gradient-to-br ${stat.color} p-6 rounded-2xl text-white shadow-lg transform transition-all hover:-translate-y-1 cursor-pointer active:scale-95 text-left`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-white/20 rounded-xl">
                  <stat.icon className="w-6 h-6" />
                </div>
                {stat.change && (
                  <span className="text-sm font-medium px-3 py-1 rounded-full bg-white/30">
                    {stat.change}
                  </span>
                )}
              </div>
              <p className="text-2xl font-bold mb-1">{stat.value}</p>
              <p className="text-sm opacity-90 mb-1">{stat.title}</p>
              {stat.breakdown && (
                <p className="text-xs opacity-75 mb-1">{stat.breakdown}</p>
              )}
              <p className="text-xs opacity-75">{stat.description}</p>
            </div>
          ))}
        </div>

        {/* Quick Actions - Single Row */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-600" />
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action) => (
              <button
                key={action.id}
                onClick={action.onClick}
                className={`${action.color} p-5 rounded-xl text-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95 text-left`}
              >
                <div className="flex flex-col">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-white/20 rounded-lg">
                      <action.icon className="w-5 h-5" />
                    </div>
                  </div>
                  <span className="font-medium text-lg mb-1">{action.label}</span>
                  <span className="text-sm opacity-90">{action.description}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Balance Summary */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Wallet className="w-5 h-5 text-amber-600" />
            Balance Summary
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Sticks</span>
                <span className="font-bold text-gray-900">
                  {stickBalance.total.toLocaleString('en-US')} Sticks
                </span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div className="h-full w-full bg-amber-500 rounded-full"></div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Free Sticks</span>
                <span className="font-bold text-green-600">
                  {stickBalance.free.toLocaleString('en-US')} Sticks
                </span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div 
                  className="h-full bg-green-500 rounded-full"
                  style={{ width: `${(stickBalance.free / stickBalance.total) * 100}%` }}
                ></div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Purchased Sticks</span>
                <span className="font-bold text-blue-600">
                  {stickBalance.purchased.toLocaleString('en-US')} Sticks
                </span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div 
                  className="h-full bg-blue-500 rounded-full"
                  style={{ width: `${(stickBalance.purchased / stickBalance.total) * 100}%` }}
                ></div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Spent This Month</span>
                <span className="font-bold text-red-600">
                  {stickBalance.spentThisMonth.toLocaleString('en-US')} Sticks
                </span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div className="h-full w-3/4 bg-red-500 rounded-full"></div>
              </div>
            </div>
          </div>
          
          {/* Value Information */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-center md:text-left">
                <p className="text-sm text-gray-600">Current Rate</p>
                <p className="text-lg font-bold text-gray-900">$0.10 per stick</p>
              </div>
              <div className="text-center md:text-left">
                <p className="text-sm text-gray-600">Total Value</p>
                <p className="text-lg font-bold text-gray-900">
                  ${(stickBalance.total * 0.10).toFixed(2)}
                </p>
              </div>
              <div className="text-center md:text-left">
                <p className="text-sm text-gray-600">Free Sticks Value</p>
                <p className="text-lg font-bold text-green-600">
                  ${(stickBalance.free * 0.10).toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Transaction History */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden mb-8">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
              <div>
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <History className="w-5 h-5 text-blue-600" />
                  Stick Transaction History
                </h2>
                <p className="text-gray-600 text-sm mt-1">
                  All stick movements - purchases, spending, refunds
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search stick transactions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
                  />
                </div>
              </div>
            </div>
            
            {/* Transaction Type Filters */}
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="text-sm text-gray-600 mr-2">Filter by type:</span>
              {["All", "Spend", "Purchase", "Bonus", "Refund", "Hold"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setSelectedFilters(prev => ({
                    ...prev,
                    transactionType: tab === "All" ? "all" : tab.toLowerCase()
                  }))}
                  className={`px-3 py-1 rounded-full text-sm transition-all ${
                    selectedFilters.transactionType === (tab === "All" ? "all" : tab.toLowerCase())
                      ? tab === "Spend" ? "bg-red-100 text-red-700" :
                        tab === "Purchase" ? "bg-green-100 text-green-700" :
                        tab === "Bonus" ? "bg-emerald-100 text-emerald-700" :
                        tab === "Refund" ? "bg-purple-100 text-purple-700" :
                        tab === "Hold" ? "bg-amber-100 text-amber-700" :
                        "bg-gray-200 text-gray-700"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            
            {/* Stick Source Filters */}
            <div className="flex flex-wrap gap-2">
              <span className="text-sm text-gray-600 mr-2">Filter by source:</span>
              {["All", "Free", "Purchased", "Refund"].map((source) => (
                <button
                  key={source}
                  onClick={() => setSelectedFilters(prev => ({
                    ...prev,
                    stickSource: source.toLowerCase()
                  }))}
                  className={`px-3 py-1 rounded-full text-sm transition-all ${
                    selectedFilters.stickSource === source.toLowerCase()
                      ? source === "Free" ? "bg-green-100 text-green-700" :
                        source === "Purchased" ? "bg-blue-100 text-blue-700" :
                        source === "Refund" ? "bg-purple-100 text-purple-700" :
                        "bg-gray-200 text-gray-700"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {source} Sticks
                </button>
              ))}
            </div>
          </div>

          {/* Transaction List */}
          <div className="divide-y divide-gray-100 max-h-[600px] overflow-y-auto">
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="p-6 hover:bg-gray-50/50 transition-colors cursor-pointer"
                  onClick={() => handleViewDetails(transaction)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                        transaction.type === 'spend' ? 'bg-red-50' :
                        transaction.type === 'purchase' ? 'bg-green-50' :
                        transaction.type === 'bonus' ? 'bg-emerald-50' :
                        transaction.type === 'refund' ? 'bg-purple-50' :
                        'bg-amber-50'
                      }`}>
                        {transaction.type === 'spend' ? (
                          <ArrowUpCircle className="w-7 h-7 text-red-600" />
                        ) : transaction.type === 'purchase' ? (
                          <ArrowDownCircle className="w-7 h-7 text-green-600" />
                        ) : transaction.type === 'bonus' ? (
                          <Gift className="w-7 h-7 text-emerald-600" />
                        ) : transaction.type === 'refund' ? (
                          <RefreshCw className="w-7 h-7 text-purple-600" />
                        ) : (
                          <Clock className="w-7 h-7 text-amber-600" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-semibold text-gray-900 text-lg">
                            {transaction.name}
                          </h4>
                          <span className={`px-3 py-1 text-sm rounded-full ${
                            transaction.status === 'completed' ? 'bg-green-100 text-green-700' :
                            transaction.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {transaction.status}
                          </span>
                          <span className={`px-3 py-1 text-sm rounded-full ${
                            transaction.stickSource === 'free' ? 'bg-green-100 text-green-700' :
                            transaction.stickSource === 'purchased' ? 'bg-blue-100 text-blue-700' :
                            transaction.stickSource === 'refund' ? 'bg-purple-100 text-purple-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {transaction.stickSource} sticks
                          </span>
                        </div>
                        <p className="text-gray-600 mb-2">{transaction.description}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {transaction.date}
                          </span>
                          <span>{transaction.category}</span>
                          {transaction.platform && (
                            <span>Platform: {transaction.platform}</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-2xl font-bold ${
                        transaction.sticks.startsWith('+') ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {transaction.sticks}
                      </p>
                      {transaction.remainingBalance && (
                        <p className="text-sm text-gray-500 mt-2">
                          Balance: {transaction.remainingBalance.toLocaleString()} sticks
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-12 text-center">
                <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 text-lg">No transactions found</p>
                <p className="text-gray-500 mt-2">Try changing your filters or search terms</p>
              </div>
            )}
          </div>
          
          {/* View All Button */}
          <div className="p-6 border-t border-gray-200">
            <button
              onClick={handleViewAllTransactions}
              className="w-full py-3 border-2 border-gray-300 rounded-xl hover:bg-gray-50 font-medium transition-colors flex items-center justify-center gap-2"
            >
              <Eye className="w-5 h-5" />
              View All Transactions
            </button>
          </div>
        </div>

        {/* Spending Analysis */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
            <BarChart3 className="w-7 h-7 text-blue-600" />
            Spending Analysis
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Promotion Spending */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">Promotion Spending</h3>
                  <p className="text-gray-600">Total sticks spent on promotions</p>
                </div>
                <span className="text-2xl font-bold text-purple-600">
                  {stickBreakdown.promotions.toLocaleString('en-US')} Sticks
                </span>
              </div>
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full w-4/5 bg-purple-500 rounded-full"></div>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>85% of total spending</span>
                <span>24 promotions</span>
              </div>
            </div>
            
            {/* Refunds Received */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">Refunds Received</h3>
                  <p className="text-gray-600">Sticks returned from cancelled promotions</p>
                </div>
                <span className="text-2xl font-bold text-blue-600">
                  {stickBreakdown.refunds.toLocaleString('en-US')} Sticks
                </span>
              </div>
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full w-1/6 bg-blue-500 rounded-full"></div>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>7% of total activity</span>
                <span>3 refunds</span>
              </div>
            </div>
            
            {/* Platform Fees */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">Platform Fees</h3>
                  <p className="text-gray-600">Service and maintenance fees</p>
                </div>
                <span className="text-2xl font-bold text-gray-600">
                  {stickBreakdown.fees.toLocaleString('en-US')} Sticks
                </span>
              </div>
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full w-1/12 bg-gray-500 rounded-full"></div>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>3% of total spending</span>
                <span>12 transactions</span>
              </div>
            </div>
            
            {/* Bonuses Earned */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">Bonuses Earned</h3>
                  <p className="text-gray-600">Free sticks from rewards and incentives</p>
                </div>
                <span className="text-2xl font-bold text-green-600">
                  {stickBreakdown.bonuses.toLocaleString('en-US')} Sticks
                </span>
              </div>
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full w-1/8 bg-green-500 rounded-full"></div>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>5% of total balance</span>
                <span>5 bonuses</span>
              </div>
            </div>
          </div>
        </div>

        {/* Budget Tips Section */}
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <Shield className="w-7 h-7 text-blue-600" />
            Budget Management Tips
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-5 rounded-xl shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Gift className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="font-bold text-gray-900">Use Free Sticks First</h3>
              </div>
              <p className="text-gray-600">
                The system automatically uses your free sticks before purchased ones, helping you maximize value.
              </p>
            </div>
            
            <div className="bg-white p-5 rounded-xl shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <PieChart className="w-5 h-5 text-purple-600" />
                </div>
                <h3 className="font-bold text-gray-900">Track Spending Patterns</h3>
              </div>
              <p className="text-gray-600">
                Monitor your monthly spending to identify trends and optimize your promotion budget.
              </p>
            </div>
            
            <div className="bg-white p-5 rounded-xl shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-amber-100 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-amber-600" />
                </div>
                <h3 className="font-bold text-gray-900">Plan Campaigns Ahead</h3>
              </div>
              <p className="text-gray-600">
                Reserve sticks for upcoming campaigns to ensure you have budget when you need it.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default WalletPage;
