import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'hi' | 'mr';
export type UserRole = 'citizen' | 'admin';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  points?: number;
  level?: number;
  badges?: string[];
  phone?: string;
  location?: string;
  bio?: string;
}

interface Issue {
  id: number;
  title: string;
  description: string;
  location: string;
  priority: 'high' | 'medium' | 'low';
  category: string;
  reportedBy: string;
  reportedDate: string;
  assignedTo: string;
  image: string;
  status: 'assigned' | 'in-progress' | 'resolved';
  upvotes: number;
  estimatedTime: string;
  afterImage?: string;
  resolvedDate?: string;
  department?: string;
  cost?: string;
}

interface AppContextType {
  user: User | null;
  token: string | null;
  language: Language;
  issues: Issue[];
  resolvedIssues: Issue[];
  setLanguage: (lang: Language) => void;
  login: (email: string, password: string, role: UserRole) => Promise<boolean>;
  signup: (userData: { name: string; email: string; phone: string; role: UserRole }) => Promise<void>;
  logout: () => void;
  uploadIssuePhoto: (issueId: number, photoFile: File) => Promise<string>;
  markIssueResolved: (issueId: number, afterImage?: string, cost?: string) => void;
  isLoading: boolean;
  isNavigating: boolean;
  setIsNavigating: (loading: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const translations = {
  en: {
    chooseRole: "Choose Role",
    citizen: "Citizen",
    administrator: "Administrator",
    continueAsCitizen: "Continue as Citizen",
    continueAsAdmin: "Continue as Admin",
    reportIssues: "Report civic issues with photos",
    trackProgress: "Track issue resolution progress",
    earnPoints: "Earn points and badges",
    voiceReporting: "Voice-enabled reporting",
    manageIssues: "Manage and resolve issues",
    accessAnalytics: "Access heatmap and analytics",
    uploadPhotos: "Upload before/after photos",
    navigateLocations: "Navigate to issue locations",
    findItFlagItFixIt: "Find It, Flag It, Fix It",
    loadingDashboard: "Loading your dashboard...",
    welcome: "Welcome to SheharFix",
    login: "Login",
    email: "Email",
    password: "Password",
    dashboard: "Dashboard",
    reportIssue: "Report Issue",
    analytics: "Analytics",
    leaderboard: "Leaderboard",
    profile: "Profile",
    transparency: "Transparency",
    publicView: "Public View",
    logout: "Logout",
    signOut: "Sign Out"
  },
  hi: {
    chooseRole: "भूमिका चुनें",
    citizen: "नागरिक",
    administrator: "प्रशासक",
    continueAsCitizen: "नागरिक के रूप में जारी रखें",
    continueAsAdmin: "प्रशासक के रूप में जारी रखें",
    reportIssues: "फोटो के साथ नागरिक समस्याओं की रिपोर्ट करें",
    trackProgress: "मुद्दे के समाधान की प्रगति को ट्रैक करें",
    earnPoints: "अंक और बैज अर्जित करें",
    voiceReporting: "आवाज-सक्षम रिपोर्टिंग",
    manageIssues: "मुद्दों का प्रबंधन और समाधान करें",
    accessAnalytics: "हीटमैप और एनालिटिक्स तक पहुंच",
    uploadPhotos: "पहले/बाद की तस्वीरें अपलोड करें",
    navigateLocations: "मुद्दे के स्थानों पर नेविगेट करें",
    findItFlagItFixIt: "इसे खोजें, इसे फ्लैग करें, इसे ठीक करें",
    loadingDashboard: "आपका डैशबोर्ड लोड हो रहा है...",
    welcome: "SheharFix में आपका स्वागत है",
    login: "लॉगिन",
    email: "ईमेल",
    password: "पासवर्ड",
    dashboard: "डैशबोर्ड",
    reportIssue: "समस्या की रिपोर्ट करें",
    analytics: "एनालिटिक्स",
    leaderboard: "लीडरबोर्ड",
    profile: "प्रोफ़ाइल",
    transparency: "पारदर्शिता",
    publicView: "सार्वजनिक दृश्य",
    logout: "लॉगआउट",
    signOut: "साइन आउट"
  },
  mr: {
    chooseRole: "भूमिका निवडा",
    citizen: "नागरिक",
    administrator: "प्रशासक",
    continueAsCitizen: "नागरिक म्हणून सुरू ठेवा",
    continueAsAdmin: "प्रशासक म्हणून सुरू ठेवा",
    reportIssues: "फोटोसह नागरी समस्यांचा अहवाल द्या",
    trackProgress: "समस्या निराकरणाची प्रगती ट्रॅक करा",
    earnPoints: "गुण आणि बॅज मिळवा",
    voiceReporting: "आवाज-सक्षम अहवाल",
    manageIssues: "समस्यांचे व्यवस्थापन आणि निराकरण करा",
    accessAnalytics: "हीटमॅप आणि अॅनालिटिक्स अॅक्सेस करा",
    uploadPhotos: "आधी/नंतरचे फोटो अपलोड करा",
    navigateLocations: "समस्या स्थानांवर नेव्हिगेट करा",
    findItFlagItFixIt: "शोधा, चिन्हांकित करा, दुरुस्त करा",
    loadingDashboard: "तुमचे डॅशबोर्ड लोड होत आहे...",
    welcome: "SheharFix मध्ये आपले स्वागत आहे",
    login: "लॉगिन",
    email: "ईमेल",
    password: "पासवर्ड",
    dashboard: "डॅशबोर्ड",
    reportIssue: "समस्या कळवा",
    analytics: "अॅनालिटिक्स",
    leaderboard: "लीडरबोर्ड",
    profile: "प्रोफाइल",
    transparency: "पारदर्शकता",
    publicView: "सार्वजनिक दृश्य",
    logout: "लॉगआउट",
    signOut: "साइन आउट"
  }
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [language, setLanguage] = useState<Language>('en');
  const [isLoading, setIsLoading] = useState(true);
  const [isNavigating, setIsNavigating] = useState(false);
  const [issues, setIssues] = useState<Issue[]>([]);
  const [resolvedIssues, setResolvedIssues] = useState<Issue[]>([]);

  useEffect(() => {
    // Load saved data from localStorage
    const savedLang = localStorage.getItem('sheharfix-language') as Language;
    const savedUser = localStorage.getItem('sheharfix-user');
    const savedToken = localStorage.getItem('token');
    const savedResolvedIssues = localStorage.getItem('sheharfix-resolved-issues');
    
    if (savedLang) setLanguage(savedLang);
    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedToken) setToken(savedToken);
    if (savedResolvedIssues) setResolvedIssues(JSON.parse(savedResolvedIssues));
    
    // Initialize mock issues data
    const mockIssues: Issue[] = [
      {
        id: 1,
        title: 'Large pothole on MG Road',
        description: 'Deep pothole causing traffic congestion near bus stop',
        location: 'MG Road, Koramangala',
        priority: 'high',
        category: 'Roads',
        reportedBy: 'Arjun Mehta',
        reportedDate: '2024-01-20',
        assignedTo: 'Road Maintenance Team',
        image: '/src/assets/sample-pothole.jpg',
        status: 'in-progress',
        upvotes: 15,
        estimatedTime: '2 days'
      },
      {
        id: 2,
        title: 'Overflowing garbage bin',
        description: 'Garbage bin overflowing for 3 days, creating hygiene issues',
        location: 'Jayanagar 4th Block',
        priority: 'medium',
        category: 'Sanitation',
        reportedBy: 'Priya Sharma',
        reportedDate: '2024-01-19',
        assignedTo: 'Sanitation Department',
        image: '/src/assets/sample-garbage.jpg',
        status: 'assigned',
        upvotes: 8,
        estimatedTime: '1 day'
      },
      {
        id: 3,
        title: 'Blocked drainage causing flooding',
        description: 'Drainage system completely blocked after recent rains',
        location: 'BTM Layout 2nd Stage',
        priority: 'high',
        category: 'Drainage',
        reportedBy: 'Rajeev Kumar',
        reportedDate: '2024-01-18',
        assignedTo: 'Water Works Department',
        image: '/src/assets/sample-drainage.jpg',
        status: 'in-progress',
        upvotes: 22,
        estimatedTime: '3 days'
      },
      {
        id: 4,
        title: 'Street light not working',
        description: 'Multiple street lights not functioning, safety concern',
        location: 'Indiranagar 12th Main',
        priority: 'medium',
        category: 'Street Lighting',
        reportedBy: 'Meera Iyer',
        reportedDate: '2024-01-17',
        assignedTo: 'Electrical Department',
        image: '/src/assets/sample-streetlight.jpg',
        status: 'assigned',
        upvotes: 6,
        estimatedTime: '1 day'
      }
    ];
    
    setIssues(mockIssues);
    
    // Simulate loading time
    setTimeout(() => setIsLoading(false), 2000);
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('sheharfix-language', lang);
  };

  const login = async (email: string, password: string, role: UserRole): Promise<boolean> => {
    // Try real backend auth first (uses username = email)
    try {
      let resp = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: email, password }),
      });
      if (!resp.ok) {
        // Attempt auto-register (as citizen unless admin explicitly requested)
        const registerRole = role === 'admin' ? 'admin' : 'citizen';
        const reg = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: email, password, role: registerRole }),
        });
        // Ignore register failure silently and try login again anyway
        resp = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: email, password }),
        });
      }
      if (resp.ok) {
        const data = await resp.json();
        const backendUser: User = {
          id: data.user?.id || data.user?._id || data.user?.username || email,
          name: data.user?.username || email.split('@')[0],
          email,
          role: data.user?.role === 'admin' ? 'admin' : 'citizen',
          avatar: data.user?.avatarUrl,
        };
        setUser(backendUser);
        setToken(data.token || null);
        localStorage.setItem('sheharfix-user', JSON.stringify(backendUser));
        if (data.token) localStorage.setItem('token', data.token);
        return true;
      }
    } catch {
      // ignore and fallback to mock below
    }

    // Fallback: mock authentication
    if (email && password) {
      const mockUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        name: role === 'citizen' ? 'Priya Sharma' : 'Rajesh Kumar',
        email,
        role,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
        points: role === 'citizen' ? 1247 : undefined,
        level: role === 'citizen' ? 5 : undefined,
        badges: role === 'citizen' ? ['Street Guardian', 'Voice of Change'] : undefined
      };
      setUser(mockUser);
      localStorage.setItem('sheharfix-user', JSON.stringify(mockUser));
      // no real token in mock mode
      return true;
    }
    return false;
  };

  const signup = async (userData: { name: string; email: string; phone: string; role: UserRole }) => {
    // Mock signup - in real implementation, this would call your API
    const mockUser: User = {
      id: Date.now().toString(),
      name: userData.name,
      email: userData.email,
      role: userData.role,
      phone: userData.phone,
      points: userData.role === 'citizen' ? 0 : undefined,
      level: userData.role === 'citizen' ? 1 : undefined,
      badges: userData.role === 'citizen' ? [] : undefined,
    };
    
    setUser(mockUser);
    localStorage.setItem('sheharfix-user', JSON.stringify(mockUser));
  };

  const uploadIssuePhoto = async (issueId: number, photoFile: File): Promise<string> => {
    // Mock photo upload - in real implementation, this would upload to your server
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const photoUrl = e.target?.result as string;
        
        // Update issue with uploaded photo
        setIssues(prevIssues => 
          prevIssues.map(issue => 
            issue.id === issueId 
              ? { ...issue, afterImage: photoUrl, status: 'in-progress' as const }
              : issue
          )
        );
        
        resolve(photoUrl);
      };
      reader.readAsDataURL(photoFile);
    });
  };

  const markIssueResolved = (issueId: number, afterImage?: string, cost?: string) => {
    const issueToResolve = issues.find(issue => issue.id === issueId);
    if (!issueToResolve) return;
    
    const resolvedIssue: Issue = {
      ...issueToResolve,
      status: 'resolved',
      resolvedDate: new Date().toISOString().split('T')[0],
      afterImage: afterImage || issueToResolve.afterImage || issueToResolve.image,
      cost: cost || '₹15,000'
    };
    
    // Add to resolved issues
    const updatedResolvedIssues = [resolvedIssue, ...resolvedIssues];
    setResolvedIssues(updatedResolvedIssues);
    
    // Remove from active issues
    setIssues(prevIssues => prevIssues.filter(issue => issue.id !== issueId));
    
    // Save to localStorage
    localStorage.setItem('sheharfix-resolved-issues', JSON.stringify(updatedResolvedIssues));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('sheharfix-user');
    localStorage.removeItem('token');
  };

  return (
    <AppContext.Provider value={{
      user,
      token,
      language,
      issues,
      resolvedIssues,
      setLanguage: handleSetLanguage,
      login,
      signup,
      logout,
      uploadIssuePhoto,
      markIssueResolved,
      isLoading,
      isNavigating,
      setIsNavigating
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export const useTranslation = () => {
  const { language } = useApp();
  return {
    t: (key: keyof typeof translations.en) => translations[language][key] || translations.en[key],
    language
  };
};