import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, Zap, ChevronRight, AlertTriangle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { apiService } from '../services/api';
import toast from 'react-hot-toast';

interface ChartData {
  type: 'bar' | 'signals';
  title: string;
  xKey?: string;
  bars?: { key: string; name: string; color: string }[];
  data: any[];
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  chart?: ChartData;
  timestamp: Date;
}

const AIIntelligence = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I\'m your QuickStock AI Intelligence.\n\nI analyze hyper-local demand signals and inventory data. How can I assist you today?',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickQuestions = [
    'What if it rains tomorrow in Gachibowli?',
    'Demand forecast for fresh produce next 3 days',
    'Impact of Bathukamma festival on sales',
    'Optimize inventory for Node 500001',
    'Show current stock levels across all nodes',
    'Which nodes need urgent restocking?',
    'Weekly demand trends for dairy products',
    'What are the active live signals?',
    'Analyze tomato price increase impact',
    'Competitor stockout opportunities near Kukatpally',
    'Weather impact on last-mile delivery',
    'Festival preparation recommendations',
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await apiService.IntelligenceQuery({
        query: input,
        context: {},
      });

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.data.response,
        chart: response.data.chart,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      toast.error('AI Processing Failed', {
        style: { background: 'rgba(111, 28, 28, 0.9)', color: '#fff', backdropFilter: 'blur(10px)', border: '1px solid rgba(239, 68, 68, 0.3)' }
      });
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'System error: Unable to process neural query. Please check connection and try again.',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickQuestion = (question: string) => {
    setInput(question);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-120px)] pb-6 relative">
      {/* Background Decorators */}
      <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-accent-500/10 blur-[100px] rounded-full pointer-events-none mix-blend-screen" />

      {/* Neural Capabilities - Compact Horizontal at Top */}
      <div className="glass-panel rounded-xl p-3 border-white/5 flex-shrink-0 mb-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="flex items-center gap-2 p-2 rounded-lg bg-surface-light/20 border border-white/5">
            <div className="p-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex-shrink-0">
              <Sparkles className="h-3.5 w-3.5" />
            </div>
            <div className="min-w-0">
              <span className="text-white font-medium block text-xs">NLP Demand Analysis</span>
              <span className="text-[10px] text-gray-500">Plain text to metrics</span>
            </div>
          </div>
          <div className="flex items-center gap-2 p-2 rounded-lg bg-surface-light/20 border border-white/5">
            <div className="p-1.5 rounded-lg bg-accent-500/10 border border-accent-500/20 text-accent-400 flex-shrink-0">
              <Zap className="h-3.5 w-3.5" />
            </div>
            <div className="min-w-0">
              <span className="text-white font-medium block text-xs">Scenario Testing</span>
              <span className="text-[10px] text-gray-500">Supply chain simulations</span>
            </div>
          </div>
          <div className="flex items-center gap-2 p-2 rounded-lg bg-surface-light/20 border border-white/5">
            <div className="p-1.5 rounded-lg bg-pink-500/10 border border-pink-500/20 text-pink-400 flex-shrink-0">
              <Bot className="h-3.5 w-3.5" />
            </div>
            <div className="min-w-0">
              <span className="text-white font-medium block text-xs">Event Matrix</span>
              <span className="text-[10px] text-gray-500">Festivals & weather analysis</span>
            </div>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="mb-6 flex items-center gap-4">
        <div className="relative">
          <div className="absolute inset-0 bg-accent-500 blur-xl opacity-30 animate-pulse rounded-full" />
          <div className="p-3 bg-surface border border-accent-500/30 rounded-2xl relative z-10">
            <Bot className="h-8 w-8 text-accent-400" />
          </div>
        </div>
        <div>
          <h1 className="text-3xl font-heading font-bold text-white flex items-center gap-2 tracking-tight">
            AI Intelligence <Sparkles className="h-5 w-5 text-yellow-400 animate-pulse" />
          </h1>
          <p className="text-gray-400 mt-1">Conversational AI for demand signals and scenario planning</p>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6 min-h-0">
        {/* Chat Interface */}
        <div className="lg:col-span-3 flex flex-col min-h-0">
          <div className="glass-panel rounded-2xl flex flex-col h-full border-white/5 relative overflow-hidden">
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 scroll-smooth">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
                >
                  <div className={`flex max-w-[85%] md:max-w-[75%] ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'} items-end gap-3`}>
                    <div className="flex-shrink-0">
                      <div className={`h-10 w-10 rounded-full flex items-center justify-center border shadow-lg ${message.role === 'user'
                        ? 'bg-primary-900/50 border-primary-500/30 shadow-primary-500/10'
                        : 'bg-accent-900/50 border-accent-500/30 shadow-accent-500/10'
                        }`}>
                        {message.role === 'user' ? (
                          <User className="h-5 w-5 text-primary-400" />
                        ) : (
                          <Bot className="h-5 w-5 text-accent-400" />
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col gap-1 w-full">
                      <div className={`rounded-2xl px-5 py-3.5 shadow-xl backdrop-blur-md ${message.role === 'user'
                        ? 'bg-gradient-to-br from-primary-600/90 to-primary-800/90 text-white rounded-br-sm border border-primary-400/20'
                        : 'bg-surface-light/80 text-gray-100 rounded-bl-sm border border-white/10'
                        }`}>
                        {message.role === 'user' ? (
                          <p className="text-[15px] leading-relaxed whitespace-pre-wrap">{message.content}</p>
                        ) : (
                          <div className="markdown-body text-[15px] leading-relaxed prose prose-invert prose-sm max-w-none">
                            <ReactMarkdown>{message.content}</ReactMarkdown>
                          </div>
                        )}
                      </div>

                      {/* Chart rendered below assistant messages */}
                      {message.role === 'assistant' && message.chart && (
                        <div className="mt-3 glass-panel rounded-2xl p-4 border border-white/10">
                          <p className="text-xs font-semibold text-primary-400 mb-3 uppercase tracking-widest">{message.chart.title}</p>

                          {message.chart.type === 'bar' && message.chart.bars && (
                            <div className="h-52 w-full">
                              <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={message.chart.data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                                  <XAxis dataKey={message.chart.xKey} stroke="#9ca3af" fontSize={11} tickLine={false} axisLine={false} />
                                  <YAxis stroke="#9ca3af" fontSize={11} tickLine={false} axisLine={false} />
                                  <Tooltip
                                    contentStyle={{ backgroundColor: 'rgba(15,23,42,0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', fontSize: '12px' }}
                                    itemStyle={{ color: '#fff' }}
                                  />
                                  <Legend wrapperStyle={{ fontSize: '11px', color: '#9ca3af' }} />
                                  {message.chart.bars.map(b => (
                                    <Bar key={b.key} dataKey={b.key} name={b.name} fill={b.color} radius={[4, 4, 0, 0]} />
                                  ))}
                                </BarChart>
                              </ResponsiveContainer>
                            </div>
                          )}

                          {message.chart.type === 'signals' && (
                            <ul className="space-y-2">
                              {message.chart.data.map((s: any, i: number) => (
                                <li key={i} className="flex items-start gap-2 text-[13px] text-gray-300 bg-surface/50 rounded-lg px-3 py-2 border border-white/5">
                                  <AlertTriangle className="h-3.5 w-3.5 text-yellow-400 mt-0.5 flex-shrink-0" />
                                  <span><span className="text-yellow-400 font-medium capitalize">{s.type}: </span>{s.signal}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      )}
                      <span className={`text-[11px] text-gray-500 font-medium ${message.role === 'user' ? 'text-right pr-1' : 'text-left pl-1'}`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start animate-fade-in">
                  <div className="flex max-w-[80%] items-end gap-3">
                    <div className="flex-shrink-0 mb-5">
                      <div className="h-10 w-10 rounded-full bg-accent-900/50 border border-accent-500/30 shadow-lg shadow-accent-500/10 flex items-center justify-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-accent-500/20 animate-pulse" />
                        <Bot className="h-5 w-5 text-accent-400 relative z-10" />
                      </div>
                    </div>
                    <div className="bg-surface-light/80 rounded-2xl rounded-bl-sm px-5 py-4 border border-white/10 shadow-xl mb-5">
                      <div className="flex space-x-2 items-center h-4">
                        <div className="w-2 h-2 bg-accent-400 rounded-full animate-bounce shadow-[0_0_8px_rgba(139,92,246,0.8)]" />
                        <div className="w-2 h-2 bg-accent-400 rounded-full animate-bounce shadow-[0_0_8px_rgba(139,92,246,0.8)]" style={{ animationDelay: '0.15s' }} />
                        <div className="w-2 h-2 bg-accent-400 rounded-full animate-bounce shadow-[0_0_8px_rgba(139,92,246,0.8)]" style={{ animationDelay: '0.3s' }} />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-surface/50 border-t border-white/5 backdrop-blur-xl">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary-500/20 to-accent-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500" />
                <div className="relative flex items-center bg-surface-dark border border-white/10 rounded-2xl focus-within:border-primary-500/50 focus-within:ring-1 focus-within:ring-primary-500/50 transition-all shadow-inner">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Ask AI about inventory routing, weather impact, or demand spikes..."
                    className="flex-1 bg-transparent px-5 py-4 text-white placeholder-gray-500 focus:outline-none"
                    disabled={loading}
                    autoComplete="off"
                  />
                  <div className="pr-2">
                    <button
                      onClick={handleSend}
                      disabled={loading || !input.trim()}
                      className="p-3 bg-primary-600 text-white rounded-xl hover:bg-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-primary-500/25 flex items-center justify-center group/btn"
                    >
                      <Send className="h-5 w-5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
              <p className="text-center text-xs text-gray-500 mt-3 font-medium">QuickStock AI can make mistakes. Verify critical supply chain actions.</p>
            </div>
          </div>
        </div>

        {/* Quick Actions Panel */}
        <div className="hidden lg:flex lg:flex-col min-h-0 h-full">
          {/* Suggested Prompts */}
          <div className="glass-panel rounded-2xl p-5 border-white/5 relative overflow-hidden h-full flex flex-col">
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary-500/10 blur-2xl rounded-full" />
            <h3 className="text-sm font-heading font-semibold text-white mb-4 flex items-center uppercase tracking-wider flex-shrink-0">
              <Zap className="h-4 w-4 mr-2 text-yellow-400" />
              Suggested Queries
            </h3>
            <div className="space-y-2 relative z-10 overflow-y-auto pr-1 flex-1 custom-scrollbar">
              {quickQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickQuestion(question)}
                  className="w-full text-left px-3 py-2.5 bg-surface-light/40 border border-white/5 hover:border-primary-500/30 hover:bg-surface-light/80 rounded-xl text-sm text-gray-300 transition-all flex items-center justify-between group"
                >
                  <span className="truncate pr-2">{question}</span>
                  <ChevronRight className="h-4 w-4 text-gray-500 group-hover:text-primary-400 transition-colors opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIIntelligence;
