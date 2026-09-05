export const SECTION_IDS = ['frontend', 'technical', 'experience', 'reports']

export const sectionContent = {
  frontend: {
    eyebrow: 'Selected work',
    title: 'Data Products',
    intro: 'Decision-ready tools built from messy questions, data, and models.',
    items: [
      { title: 'HDB Price Prediction Analytics Tool', summary: 'A three-page buyer tool combining market exploration, amenity comparison, and ML-backed valuation.', tags: ['Python', 'Machine Learning', 'Dash'], image: '/previews/hdb-tool-preview.png' },
      { title: 'Company Intelligence Tool', summary: 'An interactive workspace that clusters companies by financial features and turns model output into readable insight.', tags: ['Python', 'NLP', 'Data Visualisation'], image: '/previews/company-intelligence-preview.png' },
    ],
  },
  technical: {
    eyebrow: 'Under the hood',
    title: 'Applied Data Science',
    intro: 'Predictive modelling, structured analysis, and interactive decision support.',
    items: [
      { title: 'Time Series Weather Forecasting', summary: 'Compared five forecasting models across more than ten years of hourly weather data, with an engineered feature pipeline for robust validation.', tags: ['Time Series', 'Python', 'NumPy'], image: '/previews/weather-forecast-preview.png', demoUrl: 'https://github.com/qyunhan/Weather-Forecast-ML-Modelling' },
      { title: 'Bank Insights Automation', summary: 'Replaced a multi-hour manual workflow with a data pipeline designed for daily bank insights and financial strategy research.', tags: ['Automation', 'Financial Analysis', 'Python'], image: '/previews/bank-insights-preview.png' },
    ],
  },
  experience: {
    eyebrow: 'About & experience',
    title: 'Data, models, and decisions',
    intro: 'I turn analytical work into tools and narratives that stakeholders can use.',
    timeline: [
      { period: 'Now', role: 'Data Science Intern - UOB AI Innovation Group', detail: 'Automated a manual bank-insights workflow and designed an evaluation framework for bank-specific AI outputs.', tags: ['Python', 'LLM Evaluation', 'Financial Data'] },
      { period: 'Before', role: 'Finance Analytics Intern - Shopee CFO Office', detail: 'Built models and strategy-ready reporting that translated technical findings into CFO-facing decisions.', tags: ['SQL', 'Excel Modelling', 'Data Storytelling'] },
      { period: 'Earlier', role: 'Valuation, Modelling & Economics Intern - Ernst & Young', detail: 'Applied segmentation and proxy-model analysis to produce clear, client-facing valuation insight.', tags: ['Analytics', 'Model Selection', 'Stakeholder Communication'] },
    ],
  },
  reports: {
    eyebrow: 'Research archive',
    title: 'Reports & Research',
    intro: 'Financial research and analytical writing that connect evidence to a decision.',
    items: [
      { meta: 'Equity research · PDF', title: 'Equity Research Reports', summary: 'Fundamental valuation research using DCF, EV/EBITDA, and P/E frameworks to identify catalysts and investment risks.', tags: ['Valuation', 'Bloomberg', 'Financial Modelling'], image: '/previews/equity-research-cover.png', link: 'https://github.com/qyunhan/Equity-Research-Reports' },
      { meta: 'CFO strategy · PDF', title: 'Executive Strategy Decks', summary: 'Financial analysis and reporting distilled into clear decision materials for senior stakeholders.', tags: ['SQL', 'Excel', 'Data Storytelling'], image: '/previews/strategy-deck-cover.png' },
      { meta: 'Technical note · Demo', title: 'Model Evaluation Framework', summary: 'A bank-specific framework for measuring accuracy, business usefulness, and response reliability in AI-assisted workflows.', tags: ['LLM Evaluation', 'Metrics', 'Product Thinking'], image: '/previews/model-evaluation-preview.png' },
    ],
  },
}
