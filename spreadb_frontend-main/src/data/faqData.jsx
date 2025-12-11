// src/data/faqData.js

export const categoryIcons = {
  "getting-started": (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  "account-profile": (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  ),
  "collaboration": (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  ),
  "tokens-wallet": (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  ),
  "payment-security": (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
  ),
  "verification-safety": (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  "technical": (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  )
};

export const faqSections = [
  {
    id: "getting-started",
    title: "Getting Started",
    icon: categoryIcons["getting-started"],
    questions: [
      {
        id: "gs-1",
        question: "How to create your influencer profile?",
        answer: "1. Sign up with your email or phone\n2. Choose 'Influencer' as your account type\n3. Fill in your basic details\n4. Connect your social media accounts (Instagram, YouTube, etc.)\n5. Add your niche and content categories\n6. Submit for verification\n7. Start applying for promotions!",
        audience: "influencer"
      },
      {
        id: "gs-2",
        question: "How to create your brand owner profile?",
        answer: "1. Sign up with your business email\n2. Choose 'Brand Owner' as account type\n3. Add your company details\n4. Upload business verification documents\n5. Set up your payment method\n6. Start posting promotions for influencers!",
        audience: "brand"
      },
      {
        id: "gs-3",
        question: "How to connect social media accounts?",
        answer: "1. Go to Profile Settings\n2. Click 'Connect Social Media'\n3. Select platform (Instagram, YouTube, TikTok)\n4. Follow authentication steps\n5. Your account stats will sync automatically\nNote: We only request read access to verify your audience.",
        audience: "both"
      },
      {
        id: "gs-4",
        question: "How does the verification process work?",
        answer: "Influencers: Aadhar-based verification + social media verification\nBrand Owners: Business registration + GST verification\nBoth processes take 1-2 business days. You'll receive free 100 SpreadB coins after successful verification.",
        audience: "both"
      }
    ]
  },
  {
    id: "account-profile",
    title: "Account & Profile",
    icon: categoryIcons["account-profile"],
    questions: [
      {
        id: "ap-1",
        question: "How to update profile details?",
        answer: "Navigate to Profile → Edit Profile. You can update:\n• Bio and description\n• Contact information\n• Social media links\n• Niche categories\n• Portfolio images\nSave changes to update your profile immediately.",
        audience: "both"
      },
      {
        id: "ap-2",
        question: "How to change password or reset password?",
        answer: "Change password: Settings → Security → Change Password\nReset password: Click 'Forgot Password' on login page → Enter email → Follow reset link → Set new password",
        audience: "both"
      },
      {
        id: "ap-3",
        question: "How to delete or deactivate my account?",
        answer: "Deactivate: Settings → Account → Deactivate Account (temporary)\nDelete: Settings → Account → Delete Account (permanent)\nNote: You must resolve all active collaborations before deletion.",
        audience: "both"
      }
    ]
  },
  {
    id: "collaboration",
    title: "Collaboration & Promotions",
    icon: categoryIcons["collaboration"],
    questions: [
      {
        id: "cp-1",
        question: "How to post a promotion as a brand?",
        answer: "1. Click 'Post Promotion' from dashboard\n2. Fill promotion details (budget, requirements, timeline)\n3. Set target audience criteria\n4. Choose promotion type (paid/affiliate)\n5. Pay with SpreadB coins\n6. Review and publish\nInfluencers can apply within 24 hours.",
        audience: "brand"
      },
      {
        id: "cp-2",
        question: "How to apply for promotions as an influencer?",
        answer: "1. Browse available promotions\n2. Click on promotion for details\n3. Submit proposal with your rate and ideas\n4. Use SpreadB coins to apply (refundable if not selected)\n5. Wait for brand response (usually 2-3 days)\n6. Start collaboration upon acceptance",
        audience: "influencer"
      },
      {
        id: "cp-3",
        question: "What happens after my application is accepted?",
        answer: "1. You'll receive notification\n2. Chat with brand for details\n3. Create and submit content\n4. Brand reviews and approves\n5. Payment released to your wallet\n6. Both parties leave reviews",
        audience: "influencer"
      },
      {
        id: "cp-4",
        question: "How do reviews and ratings work?",
        answer: "After collaboration completion:\n• Brands rate influencers on content quality, professionalism, timeliness\n• Influencers rate brands on communication, payment, clarity\n• Both reviews are public on profiles\n• Average rating affects future opportunities",
        audience: "both"
      }
    ]
  },
  {
    id: "tokens-wallet",
    title: "Tokens & Wallet",
    icon: categoryIcons["tokens-wallet"],
    questions: [
      {
        id: "tw-1",
        question: "What are SpreadB Coins?",
        answer: "SpreadB Coins are our platform currency used for:\n• Brands: Paying to post promotions\n• Influencers: Paying to apply for promotions\n• Both: Featured listings, priority support\nYou get 100 free coins after verification.",
        audience: "both"
      },
      {
        id: "tw-2",
        question: "How to buy SpreadB Coins?",
        answer: "1. Go to Wallet section\n2. Click 'Buy Coins'\n3. Select amount (packs from 100 to 10,000 coins)\n4. Choose payment method (UPI, Card, Net Banking)\n5. Complete payment\n6. Coins credited instantly\nNote: 1 Coin = ₹1",
        audience: "both"
      },
      {
        id: "tw-3",
        question: "How are coins deducted for posting/apply?",
        answer: "Brands: 50 coins per promotion post (valid for 7 days)\nInfluencers: 5 coins per application (refunded if not selected)\nFeatured promotions: Additional 20 coins\nTransaction history available in Wallet.",
        audience: "both"
      },
      {
        id: "tw-4",
        question: "What if I face wallet issues?",
        answer: "Common issues:\n• Coins not credited: Contact support with transaction ID\n• Wrong deduction: Report within 24 hours\n• Refund requests: Processed in 3-5 business days\nAlways check transaction history first.",
        audience: "both"
      }
    ]
  },
  {
    id: "payment-security",
    title: "Payment & Security",
    icon: categoryIcons["payment-security"],
    questions: [
      {
        id: "ps-1",
        question: "How secure are payments on SpreadB?",
        answer: "We use:\n• 256-bit SSL encryption\n• PCI DSS compliant payment gateways\n• Two-factor authentication\n• Escrow system for collaborations\n• Daily fraud monitoring\nYour financial data is never stored on our servers.",
        audience: "both"
      },
      {
        id: "ps-2",
        question: "When do influencers get paid?",
        answer: "Payment process:\n1. Brand deposits payment in escrow\n2. Influencer submits work\n3. Brand approves within 48 hours\n4. Payment auto-releases to influencer wallet\n5. Influencer can withdraw anytime\nNote: Minimum withdrawal is ₹500.",
        audience: "influencer"
      },
      {
        id: "ps-3",
        question: "What is the dispute resolution process?",
        answer: "1. Click 'Raise Dispute' on collaboration page\n2. Submit evidence (screenshots, chat)\n3. Our team reviews within 48 hours\n4. Mediation call if needed\n5. Final decision within 5 days\nNote: Keep all communication on platform.",
        audience: "both"
      }
    ]
  },
  {
    id: "verification-safety",
    title: "Verification & Safety",
    icon: categoryIcons["verification-safety"],
    questions: [
      {
        id: "vs-1",
        question: "Why Aadhar-based verification?",
        answer: "Aadhar verification ensures:\n• Real person identity\n• Age verification (18+ only)\n• Location verification\n• One account per person\n• Fraud prevention\nYour Aadhar data is encrypted and secure.",
        audience: "both"
      },
      {
        id: "vs-2",
        question: "What are fake engagement warnings?",
        answer: "We monitor for:\n• Bought followers/likes\n• Bot engagement\n• Inauthentic comments\n• Rapid unfollow patterns\nPenalties:\n1st offense: Warning\n2nd offense: Account suspension\n3rd offense: Permanent ban",
        audience: "influencer"
      },
      {
        id: "vs-3",
        question: "How to report suspicious activity?",
        answer: "Report:\n• Fake profiles\n• Scam messages\n• Payment fraud\n• Inappropriate content\nSteps: Click 'Report' on profile/message → Select reason → Submit evidence\nWe investigate within 24 hours.",
        audience: "both"
      }
    ]
  },
  {
    id: "technical",
    title: "Technical Support",
    icon: categoryIcons["technical"],
    questions: [
      {
        id: "ts-1",
        question: "App not loading or crashing?",
        answer: "Try:\n1. Check internet connection\n2. Update app to latest version\n3. Clear app cache/data\n4. Restart device\n5. Reinstall app\nIf issue persists, contact support with device details.",
        audience: "both"
      },
      {
        id: "ts-2",
        question: "Login issues?",
        answer: "Common solutions:\n• Forgot password: Use reset link\n• Account locked: Too many failed attempts\n• Email not verified: Check spam folder\n• Browser issues: Try incognito mode\nContact support if unresolved.",
        audience: "both"
      },
      {
        id: "ts-3",
        question: "Notifications not working?",
        answer: "Check:\n1. App notification permissions\n2. Phone notification settings\n3. Do Not Disturb mode\n4. App battery optimization\nEnable all notifications in Settings for best experience.",
        audience: "both"
      }
    ]
  }
];

export const contactIcons = {
  email: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  phone: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  ),
  chat: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  ),
  search: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  )
};