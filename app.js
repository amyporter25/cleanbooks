// Data Store
let clients = [];
let currentClientId = null;
let currentTab = 'overview';
let nextClientId = 1;

// Team members
const teamMembers = [
  { id: 1, name: 'You (Primary)', email: 'consultant@bookkeeping.com', role: 'Lead Consultant' },
  { id: 2, name: 'Sarah Admin', email: 'sarah@bookkeeping.com', role: 'Bookkeeper' },
  { id: 3, name: 'Mike Backup', email: 'mike@bookkeeping.com', role: 'Senior Bookkeeper' }
];

// Access credentials template
const accessCredentialsTemplate = [
  { type: 'QuickBooks Online', status: 'Not Started', dateReceived: '', notes: '' },
  { type: 'Primary Bank Account', status: 'Not Started', dateReceived: '', notes: '' },
  { type: 'Secondary Bank Account', status: 'Not Started', dateReceived: '', notes: '' },
  { type: 'Credit Card - Primary', status: 'Not Started', dateReceived: '', notes: '' },
  { type: 'PayPal', status: 'Not Started', dateReceived: '', notes: '' },
  { type: 'Stripe', status: 'Not Started', dateReceived: '', notes: '' },
  { type: 'Payroll Platform', status: 'Not Started', dateReceived: '', notes: '' },
  { type: 'Google Drive/OneDrive', status: 'Not Started', dateReceived: '', notes: '' },
  { type: 'Tax Preparer Contact', status: 'Not Started', dateReceived: '', notes: '' }
];

// Document checklist template
const documentChecklistTemplate = [
  { category: 'Bank Statements', items: [
    { name: '2024 Bank Statements', completed: false, dateReceived: '', notes: '', files: [] },
    { name: '2023 Bank Statements', completed: false, dateReceived: '', notes: '', files: [] },
    { name: '2022 Bank Statements', completed: false, dateReceived: '', notes: '', files: [] }
  ]},
  { category: 'Tax Documents', items: [
    { name: '2024 Tax Return', completed: false, dateReceived: '', notes: '', files: [] },
    { name: '2023 Tax Return', completed: false, dateReceived: '', notes: '', files: [] },
    { name: '2022 Tax Return', completed: false, dateReceived: '', notes: '', files: [] },
    { name: 'Quarterly 941s', completed: false, dateReceived: '', notes: '', files: [] }
  ]},
  { category: 'Supporting Documents', items: [
    { name: 'Chart of Accounts', completed: false, dateReceived: '', notes: '', files: [] },
    { name: 'Outstanding Invoices', completed: false, dateReceived: '', notes: '', files: [] },
    { name: 'Unpaid Bills', completed: false, dateReceived: '', notes: '', files: [] },
    { name: 'Payroll Records', completed: false, dateReceived: '', notes: '', files: [] },
    { name: 'Loan Documents', completed: false, dateReceived: '', notes: '', files: [] },
    { name: 'Fixed Asset Documentation', completed: false, dateReceived: '', notes: '', files: [] }
  ]}
];

// Cleanup steps template
const cleanupStepsTemplate = [
  { step: 1, title: 'Gather All Financial Records', description: 'Collect bank statements, credit card statements, receipts, invoices, bills, and supporting documentation', status: 'Not Started', assignedTo: 1, startDate: '', endDate: '' },
  { step: 2, title: 'Reconcile Bank Statements', description: 'Match transactions in QB to bank statements, identify discrepancies, clear old items', status: 'Not Started', assignedTo: 1, startDate: '', endDate: '' },
  { step: 3, title: 'Categorize Transactions', description: 'Review all transactions and assign to correct account, ensure consistency', status: 'Not Started', assignedTo: 1, startDate: '', endDate: '' },
  { step: 4, title: 'Review Outstanding Invoices and Bills', description: 'Verify A/R and A/P accuracy against actual documents', status: 'Not Started', assignedTo: 1, startDate: '', endDate: '' },
  { step: 5, title: 'Clear Up AP and AR', description: 'Resolve discrepancies, apply payments correctly, clear old balances', status: 'Not Started', assignedTo: 1, startDate: '', endDate: '' },
  { step: 6, title: 'Review and Update Fixed Assets', description: 'Verify asset purchases, depreciation, and disposal', status: 'Not Started', assignedTo: 1, startDate: '', endDate: '' },
  { step: 7, title: 'Reconcile Credit Card Statements', description: 'Match charges and payments to statements, verify categorization', status: 'Not Started', assignedTo: 1, startDate: '', endDate: '' },
  { step: 8, title: 'Review and Categorize Payroll', description: 'Verify payroll entries match 941 forms, check tax liability recording', status: 'Not Started', assignedTo: 1, startDate: '', endDate: '' },
  { step: 9, title: 'Review Inventory Records', description: 'Verify inventory values, COGS calculations, physical count discrepancies', status: 'Not Started', assignedTo: 1, startDate: '', endDate: '' },
  { step: 10, title: 'Ensure Tax Compliance', description: 'Verify 941s filed, W-2s/1099s issued, sales tax remitted', status: 'Not Started', assignedTo: 1, startDate: '', endDate: '' },
  { step: 11, title: 'Backup Data', description: 'Create backups of QB file at milestones and completion', status: 'Not Started', assignedTo: 1, startDate: '', endDate: '' },
  { step: 12, title: 'Prepare Final Reports', description: 'Generate Balance Sheet, P&L, adjustment list, reconcile to tax return', status: 'Not Started', assignedTo: 1, startDate: '', endDate: '' }
];

// Monthly close checklist template
const monthlyCloseTemplate = [
  { category: 'Transaction Management', items: [
    { name: 'Review and categorize bank feed transactions', completed: false, assignedTo: 1, completionDate: '', notes: '' },
    { name: 'Review and categorize credit card transactions', completed: false, assignedTo: 1, completionDate: '', notes: '' },
    { name: 'Verify all cash transactions recorded', completed: false, assignedTo: 1, completionDate: '', notes: '' },
    { name: 'Post all invoices and bills for the month', completed: false, assignedTo: 1, completionDate: '', notes: '' }
  ]},
  { category: 'Account Reconciliation', items: [
    { name: 'Reconcile primary bank account', completed: false, assignedTo: 1, completionDate: '', notes: '' },
    { name: 'Reconcile secondary bank account', completed: false, assignedTo: 1, completionDate: '', notes: '' },
    { name: 'Reconcile credit card accounts', completed: false, assignedTo: 1, completionDate: '', notes: '' },
    { name: 'Reconcile loan accounts', completed: false, assignedTo: 1, completionDate: '', notes: '' },
    { name: 'Reconcile liability accounts', completed: false, assignedTo: 1, completionDate: '', notes: '' }
  ]},
  { category: 'Payables & Receivables', items: [
    { name: 'Review and process unpaid bills', completed: false, assignedTo: 1, completionDate: '', notes: '' },
    { name: 'Follow up on overdue invoices', completed: false, assignedTo: 1, completionDate: '', notes: '' },
    { name: 'Process customer credits/refunds', completed: false, assignedTo: 1, completionDate: '', notes: '' },
    { name: 'Update vendor information', completed: false, assignedTo: 1, completionDate: '', notes: '' }
  ]},
  { category: 'Adjusting Entries', items: [
    { name: 'Record depreciation', completed: false, assignedTo: 1, completionDate: '', notes: '' },
    { name: 'Record accrued expenses', completed: false, assignedTo: 1, completionDate: '', notes: '' },
    { name: 'Amortize prepaid expenses', completed: false, assignedTo: 1, completionDate: '', notes: '' },
    { name: 'Recognize deferred revenue', completed: false, assignedTo: 1, completionDate: '', notes: '' }
  ]},
  { category: 'Tax Compliance', items: [
    { name: 'Calculate sales tax liability', completed: false, assignedTo: 1, completionDate: '', notes: '' },
    { name: 'Verify payroll tax deposits', completed: false, assignedTo: 1, completionDate: '', notes: '' },
    { name: 'Track estimated tax deadlines', completed: false, assignedTo: 1, completionDate: '', notes: '' }
  ]},
  { category: 'Financial Statements', items: [
    { name: 'Generate P&L statement', completed: false, assignedTo: 1, completionDate: '', notes: '' },
    { name: 'Generate Balance Sheet', completed: false, assignedTo: 1, completionDate: '', notes: '' },
    { name: 'Generate Cash Flow Statement', completed: false, assignedTo: 1, completionDate: '', notes: '' },
    { name: 'Review for accuracy and reasonableness', completed: false, assignedTo: 1, completionDate: '', notes: '' }
  ]},
  { category: 'Period Close', items: [
    { name: 'Backup QB file', completed: false, assignedTo: 1, completionDate: '', notes: '' },
    { name: 'Set closing date', completed: false, assignedTo: 1, completionDate: '', notes: '' },
    { name: 'Lock period', completed: false, assignedTo: 1, completionDate: '', notes: '' },
    { name: 'Prepare client delivery package', completed: false, assignedTo: 1, completionDate: '', notes: '' }
  ]}
];

// Initialize app
function initApp() {
  loadSampleData();
  renderDashboard();
  updateStats();
}

// Load sample data
function loadSampleData() {
  clients = [
    {
      id: nextClientId++,
      businessName: "Sarah's Bakery",
      ownerName: 'Sarah Johnson',
      email: 'sarah@sarahsbakery.com',
      phone: '(555) 123-4567',
      businessType: 'Bakery/Food Service',
      businessStructure: 'LLC',
      bankAccounts: 2,
      transactionsPerMonth: 250,
      engagementDate: '2024-11-01',
      cleanupPeriodStart: '2024-01-01',
      cleanupPeriodEnd: '2024-12-31',
      retainerFee: 600,
      status: 'In Cleanup',
      completionPercentage: 40,
      accessCredentials: JSON.parse(JSON.stringify(accessCredentialsTemplate)),
      documents: JSON.parse(JSON.stringify(documentChecklistTemplate)),
      cleanupSteps: JSON.parse(JSON.stringify(cleanupStepsTemplate)),
      monthlyClose: JSON.parse(JSON.stringify(monthlyCloseTemplate)),
      notes: 'Client is very organized. Cleanup progressing well.'
    },
    {
      id: nextClientId++,
      businessName: 'Tech Startup LLC',
      ownerName: 'Michael Chen',
      email: 'michael@techstartup.com',
      phone: '(555) 234-5678',
      businessType: 'Software/SaaS',
      businessStructure: 'C-Corp',
      bankAccounts: 3,
      transactionsPerMonth: 180,
      engagementDate: '2024-09-01',
      cleanupPeriodStart: '2024-01-01',
      cleanupPeriodEnd: '2024-12-31',
      retainerFee: 800,
      status: 'Active Retainer',
      completionPercentage: 100,
      accessCredentials: JSON.parse(JSON.stringify(accessCredentialsTemplate)),
      documents: JSON.parse(JSON.stringify(documentChecklistTemplate)),
      cleanupSteps: JSON.parse(JSON.stringify(cleanupStepsTemplate)),
      monthlyClose: JSON.parse(JSON.stringify(monthlyCloseTemplate)),
      notes: 'High-growth startup. Monthly close by 5th of each month.'
    },
    {
      id: nextClientId++,
      businessName: 'Retail Store Inc',
      ownerName: 'Jennifer Martinez',
      email: 'jen@retailstore.com',
      phone: '(555) 345-6789',
      businessType: 'Retail',
      businessStructure: 'S-Corp',
      bankAccounts: 1,
      transactionsPerMonth: 320,
      engagementDate: '2024-11-15',
      cleanupPeriodStart: '2024-07-01',
      cleanupPeriodEnd: '2024-12-31',
      retainerFee: 750,
      status: 'Onboarding',
      completionPercentage: 15,
      accessCredentials: JSON.parse(JSON.stringify(accessCredentialsTemplate)),
      documents: JSON.parse(JSON.stringify(documentChecklistTemplate)),
      cleanupSteps: JSON.parse(JSON.stringify(cleanupStepsTemplate)),
      monthlyClose: JSON.parse(JSON.stringify(monthlyCloseTemplate)),
      notes: 'New client. Waiting on QB access and bank statements.'
    }
  ];

  // Set some sample data for cleanup client
  clients[0].cleanupSteps[0].status = 'Completed';
  clients[0].cleanupSteps[1].status = 'Completed';
  clients[0].cleanupSteps[2].status = 'In Progress';
  clients[0].cleanupSteps[3].status = 'In Progress';
  clients[0].cleanupSteps[4].status = 'Not Started';
  
  clients[0].accessCredentials[0].status = 'Received';
  clients[0].accessCredentials[0].dateReceived = '2024-11-05';
  clients[0].accessCredentials[1].status = 'Received';
  clients[0].accessCredentials[1].dateReceived = '2024-11-05';

  // Set data for active retainer client
  clients[1].accessCredentials.forEach(cred => {
    cred.status = 'Received';
    cred.dateReceived = '2024-09-01';
  });
  clients[1].cleanupSteps.forEach(step => {
    step.status = 'Completed';
  });
}

// Update statistics
function updateStats() {
  const total = clients.length;
  const activeRetainers = clients.filter(c => c.status === 'Active Retainer').length;
  const inCleanup = clients.filter(c => c.status === 'In Cleanup').length;
  const onboarding = clients.filter(c => c.status === 'Onboarding').length;

  document.getElementById('totalClients').textContent = total;
  document.getElementById('activeRetainers').textContent = activeRetainers;
  document.getElementById('inCleanup').textContent = inCleanup;
  document.getElementById('onboarding').textContent = onboarding;
}

// Render dashboard
function renderDashboard() {
  const grid = document.getElementById('clientsGrid');
  grid.innerHTML = '';

  const searchTerm = document.getElementById('searchInput').value.toLowerCase();
  const filteredClients = clients.filter(client => 
    client.businessName.toLowerCase().includes(searchTerm) ||
    client.ownerName.toLowerCase().includes(searchTerm)
  );

  filteredClients.forEach(client => {
    const statusClass = getStatusClass(client.status);
    const card = document.createElement('div');
    card.className = 'card client-card';
    card.onclick = () => openClientDetail(client.id);
    card.innerHTML = `
      <div class="client-header">
        <div>
          <div class="client-name">${client.businessName}</div>
          <div class="client-owner">${client.ownerName}</div>
        </div>
        <span class="status ${statusClass}">${client.status}</span>
      </div>
      <div class="client-details">
        <div class="client-detail">
          <span class="detail-label">Business Type</span>
          <span>${client.businessType}</span>
        </div>
        <div class="client-detail">
          <span class="detail-label">Structure</span>
          <span>${client.businessStructure}</span>
        </div>
        <div class="client-detail">
          <span class="detail-label">Retainer Fee</span>
          <span>$${client.retainerFee}/mo</span>
        </div>
        <div class="client-detail">
          <span class="detail-label">Engagement Date</span>
          <span>${formatDate(client.engagementDate)}</span>
        </div>
      </div>
      <div class="progress-bar">
        <div class="progress-fill" style="width: ${client.completionPercentage}%"></div>
      </div>
    `;
    grid.appendChild(card);
  });
}

// Get status class
function getStatusClass(status) {
  switch(status) {
    case 'Active Retainer': return 'status--success';
    case 'In Cleanup': return 'status--warning';
    case 'Onboarding': return 'status--info';
    default: return 'status--info';
  }
}

// Format date
function formatDate(dateString) {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

// Filter clients
function filterClients() {
  renderDashboard();
}

// Open client detail
function openClientDetail(clientId) {
  currentClientId = clientId;
  const client = clients.find(c => c.id === clientId);
  if (!client) return;

  document.getElementById('dashboard').style.display = 'none';
  document.getElementById('clientDetail').classList.add('active');
  
  renderClientDetail(client);
}

// Render client detail
function renderClientDetail(client) {
  const detailView = document.getElementById('clientDetail');
  const statusClass = getStatusClass(client.status);
  
  detailView.innerHTML = `
    <div class="back-btn" onclick="backToDashboard()">
      ← Back to Dashboard
    </div>
    
    <div class="detail-header">
      <div class="detail-title">
        <h1>${client.businessName}</h1>
        <div style="display: flex; gap: var(--space-16); align-items: center;">
          <span class="status ${statusClass}">${client.status}</span>
          <span style="color: var(--color-text-secondary); font-size: var(--font-size-sm);">
            ${client.ownerName} • ${client.email}
          </span>
        </div>
      </div>
    </div>

    <div class="tabs">
      <button class="tab active" onclick="switchTab('overview')">Overview</button>
      <button class="tab" onclick="switchTab('credentials')">Access Credentials</button>
      <button class="tab" onclick="switchTab('documents')">Documents</button>
      ${client.status === 'In Cleanup' || client.status === 'Onboarding' ? '<button class="tab" onclick="switchTab(\'cleanup\')">Cleanup Project</button>' : ''}
      ${client.status === 'Active Retainer' ? '<button class="tab" onclick="switchTab(\'retainer\')">Monthly Retainer</button>' : ''}
      <button class="tab" onclick="switchTab('timeline')">Timeline</button>
    </div>

    <div id="tabOverview" class="tab-content active">
      ${renderOverviewTab(client)}
    </div>

    <div id="tabCredentials" class="tab-content">
      ${renderCredentialsTab(client)}
    </div>

    <div id="tabDocuments" class="tab-content">
      ${renderDocumentsTab(client)}
    </div>

    ${client.status === 'In Cleanup' || client.status === 'Onboarding' ? `
      <div id="tabCleanup" class="tab-content">
        ${renderCleanupTab(client)}
      </div>
    ` : ''}

    ${client.status === 'Active Retainer' ? `
      <div id="tabRetainer" class="tab-content">
        ${renderRetainerTab(client)}
      </div>
    ` : ''}

    <div id="tabTimeline" class="tab-content">
      ${renderTimelineTab(client)}
    </div>
  `;
}

// Render overview tab
function renderOverviewTab(client) {
  return `
    <div class="overview-grid">
      <div class="info-section">
        <h3 class="section-title">Business Information</h3>
        <div class="info-row">
          <span class="info-label">Business Name</span>
          <span class="info-value">${client.businessName}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Owner Name</span>
          <span class="info-value">${client.ownerName}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Email</span>
          <span class="info-value">${client.email}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Phone</span>
          <span class="info-value">${client.phone}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Business Type</span>
          <span class="info-value">${client.businessType}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Structure</span>
          <span class="info-value">${client.businessStructure}</span>
        </div>
      </div>

      <div class="info-section">
        <h3 class="section-title">Engagement Details</h3>
        <div class="info-row">
          <span class="info-label">Status</span>
          <span class="info-value">${client.status}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Engagement Date</span>
          <span class="info-value">${formatDate(client.engagementDate)}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Cleanup Period</span>
          <span class="info-value">${formatDate(client.cleanupPeriodStart)} - ${formatDate(client.cleanupPeriodEnd)}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Monthly Retainer</span>
          <span class="info-value">$${client.retainerFee}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Completion</span>
          <span class="info-value">${client.completionPercentage}%</span>
        </div>
      </div>

      <div class="info-section">
        <h3 class="section-title">Account Details</h3>
        <div class="info-row">
          <span class="info-label">Bank Accounts</span>
          <span class="info-value">${client.bankAccounts}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Monthly Transactions</span>
          <span class="info-value">${client.transactionsPerMonth}</span>
        </div>
      </div>

      <div class="info-section" style="grid-column: 1 / -1;">
        <h3 class="section-title">Notes</h3>
        <textarea 
          class="form-control" 
          rows="4" 
          onchange="updateClientNotes(${client.id}, this.value)"
        >${client.notes || ''}</textarea>
      </div>
    </div>
  `;
}

// Render credentials tab
function renderCredentialsTab(client) {
  let html = '<div class="checklist">';
  
  client.accessCredentials.forEach((cred, index) => {
    const statusClass = cred.status === 'Received' ? 'status--success' : 
                       cred.status === 'Pending' ? 'status--warning' : 'status--info';
    
    html += `
      <div class="checklist-item">
        <div class="checklist-header">
          <input 
            type="checkbox" 
            class="checkbox" 
            ${cred.status === 'Received' ? 'checked' : ''}
            onchange="toggleCredentialStatus(${client.id}, ${index})"
          />
          <span class="checklist-title">${cred.type}</span>
          <span class="status ${statusClass}">${cred.status}</span>
        </div>
        <div class="checklist-details">
          <div class="detail-field">
            <label class="field-label">Status</label>
            <select 
              class="form-control" 
              value="${cred.status}"
              onchange="updateCredentialStatus(${client.id}, ${index}, this.value)"
            >
              <option value="Not Started">Not Started</option>
              <option value="Requested">Requested</option>
              <option value="Pending">Pending</option>
              <option value="Received">Received</option>
            </select>
          </div>
          <div class="detail-field">
            <label class="field-label">Date Received</label>
            <input 
              type="date" 
              class="form-control" 
              value="${cred.dateReceived}"
              onchange="updateCredentialDate(${client.id}, ${index}, this.value)"
            />
          </div>
          <div class="detail-field" style="grid-column: 1 / -1;">
            <label class="field-label">Notes</label>
            <input 
              type="text" 
              class="form-control" 
              value="${cred.notes}"
              placeholder="Add notes..."
              onchange="updateCredentialNotes(${client.id}, ${index}, this.value)"
            />
          </div>
        </div>
      </div>
    `;
  });
  
  html += '</div>';
  return html;
}

// Render documents tab
function renderDocumentsTab(client) {
  let html = '';
  
  client.documents.forEach((category, catIndex) => {
    html += `
      <div style="margin-bottom: var(--space-32);">
        <h3 class="section-title" style="margin-bottom: var(--space-16);">${category.category}</h3>
        <div class="checklist">
    `;
    
    category.items.forEach((item, itemIndex) => {
      html += `
        <div class="checklist-item">
          <div class="checklist-header">
            <input 
              type="checkbox" 
              class="checkbox" 
              ${item.completed ? 'checked' : ''}
              onchange="toggleDocumentComplete(${client.id}, ${catIndex}, ${itemIndex})"
            />
            <span class="checklist-title">${item.name}</span>
          </div>
          <div class="checklist-details">
            <div class="detail-field">
              <label class="field-label">Date Received</label>
              <input 
                type="date" 
                class="form-control" 
                value="${item.dateReceived}"
                onchange="updateDocumentDate(${client.id}, ${catIndex}, ${itemIndex}, this.value)"
              />
            </div>
            <div class="detail-field">
              <label class="field-label">Files</label>
              <input 
                type="file" 
                class="form-control" 
                multiple
                onchange="handleFileUpload(${client.id}, ${catIndex}, ${itemIndex}, this.files)"
              />
            </div>
            <div class="detail-field" style="grid-column: 1 / -1;">
              <label class="field-label">Notes</label>
              <input 
                type="text" 
                class="form-control" 
                value="${item.notes}"
                placeholder="Add notes..."
                onchange="updateDocumentNotes(${client.id}, ${catIndex}, ${itemIndex}, this.value)"
              />
            </div>
          </div>
          ${item.files.length > 0 ? `
            <div class="file-list" style="margin-left: 32px; margin-top: var(--space-12);">
              ${item.files.map(file => `
                <div class="file-item">
                  <span>📄 ${file}</span>
                </div>
              `).join('')}
            </div>
          ` : ''}
        </div>
      `;
    });
    
    html += '</div></div>';
  });
  
  return html;
}

// Render cleanup tab
function renderCleanupTab(client) {
  const completedSteps = client.cleanupSteps.filter(s => s.status === 'Completed').length;
  const progress = Math.round((completedSteps / client.cleanupSteps.length) * 100);
  
  let html = `
    <div style="margin-bottom: var(--space-32);">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-16);">
        <h3 class="section-title">Cleanup Progress</h3>
        <span style="font-size: var(--font-size-lg); font-weight: var(--font-weight-bold);">
          ${completedSteps} / ${client.cleanupSteps.length} Steps Completed
        </span>
      </div>
      <div class="progress-bar" style="height: 12px;">
        <div class="progress-fill" style="width: ${progress}%"></div>
      </div>
    </div>

    <div class="steps-list">
  `;
  
  client.cleanupSteps.forEach((step, index) => {
    const isCompleted = step.status === 'Completed';
    const assignedMember = teamMembers.find(m => m.id === step.assignedTo);
    const statusClass = step.status === 'Completed' ? 'status--success' : 
                       step.status === 'In Progress' ? 'status--warning' : 'status--info';
    
    html += `
      <div class="step-item">
        <div class="step-number ${isCompleted ? 'completed' : ''}">${step.step}</div>
        <div class="step-content">
          <div class="step-title">${step.title}</div>
          <div class="step-description">${step.description}</div>
          <div class="step-meta">
            <div class="detail-field">
              <label class="field-label">Status</label>
              <select 
                class="form-control" 
                value="${step.status}"
                onchange="updateCleanupStepStatus(${client.id}, ${index}, this.value)"
                style="width: 150px;"
              >
                <option value="Not Started">Not Started</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Blocked">Blocked</option>
              </select>
            </div>
            <div class="detail-field">
              <label class="field-label">Assigned To</label>
              <select 
                class="form-control" 
                value="${step.assignedTo}"
                onchange="updateCleanupStepAssignment(${client.id}, ${index}, this.value)"
                style="width: 200px;"
              >
                ${teamMembers.map(m => `<option value="${m.id}">${m.name}</option>`).join('')}
              </select>
            </div>
            <div class="detail-field">
              <label class="field-label">Start Date</label>
              <input 
                type="date" 
                class="form-control" 
                value="${step.startDate}"
                onchange="updateCleanupStepStartDate(${client.id}, ${index}, this.value)"
                style="width: 150px;"
              />
            </div>
            <div class="detail-field">
              <label class="field-label">End Date</label>
              <input 
                type="date" 
                class="form-control" 
                value="${step.endDate}"
                onchange="updateCleanupStepEndDate(${client.id}, ${index}, this.value)"
                style="width: 150px;"
              />
            </div>
          </div>
        </div>
        <span class="status ${statusClass}">${step.status}</span>
      </div>
    `;
  });
  
  html += '</div>';
  return html;
}

// Render retainer tab
function renderRetainerTab(client) {
  let html = '<div style="display: flex; flex-direction: column; gap: var(--space-32);">';
  
  client.monthlyClose.forEach((category, catIndex) => {
    const completedItems = category.items.filter(i => i.completed).length;
    const progress = Math.round((completedItems / category.items.length) * 100);
    
    html += `
      <div>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-16);">
          <h3 class="section-title">${category.category}</h3>
          <span style="font-size: var(--font-size-sm); color: var(--color-text-secondary);">
            ${completedItems} / ${category.items.length} completed
          </span>
        </div>
        <div class="progress-bar" style="height: 6px; margin-bottom: var(--space-16);">
          <div class="progress-fill" style="width: ${progress}%"></div>
        </div>
        <div class="checklist">
    `;
    
    category.items.forEach((item, itemIndex) => {
      const assignedMember = teamMembers.find(m => m.id === item.assignedTo);
      
      html += `
        <div class="checklist-item">
          <div class="checklist-header">
            <input 
              type="checkbox" 
              class="checkbox" 
              ${item.completed ? 'checked' : ''}
              onchange="toggleMonthlyCloseItem(${client.id}, ${catIndex}, ${itemIndex})"
            />
            <span class="checklist-title">${item.name}</span>
          </div>
          <div class="checklist-details">
            <div class="detail-field">
              <label class="field-label">Assigned To</label>
              <select 
                class="form-control" 
                value="${item.assignedTo}"
                onchange="updateMonthlyCloseAssignment(${client.id}, ${catIndex}, ${itemIndex}, this.value)"
              >
                ${teamMembers.map(m => `<option value="${m.id}">${m.name}</option>`).join('')}
              </select>
            </div>
            <div class="detail-field">
              <label class="field-label">Completion Date</label>
              <input 
                type="date" 
                class="form-control" 
                value="${item.completionDate}"
                onchange="updateMonthlyCloseDate(${client.id}, ${catIndex}, ${itemIndex}, this.value)"
              />
            </div>
            <div class="detail-field" style="grid-column: 1 / -1;">
              <label class="field-label">Notes</label>
              <input 
                type="text" 
                class="form-control" 
                value="${item.notes}"
                placeholder="Add notes..."
                onchange="updateMonthlyCloseNotes(${client.id}, ${catIndex}, ${itemIndex}, this.value)"
              />
            </div>
          </div>
        </div>
      `;
    });
    
    html += '</div></div>';
  });
  
  html += '</div>';
  return html;
}

// Render timeline tab
function renderTimelineTab(client) {
  const events = [];
  
  // Add engagement event
  events.push({
    date: client.engagementDate,
    title: 'Client Engagement',
    description: `${client.businessName} signed on as a client`,
    completed: true
  });
  
  // Add credential events
  client.accessCredentials.forEach(cred => {
    if (cred.status === 'Received' && cred.dateReceived) {
      events.push({
        date: cred.dateReceived,
        title: `Access Received: ${cred.type}`,
        description: 'Credential access granted',
        completed: true
      });
    }
  });
  
  // Add cleanup milestones
  client.cleanupSteps.forEach(step => {
    if (step.status === 'Completed' && step.endDate) {
      events.push({
        date: step.endDate,
        title: step.title,
        description: 'Cleanup step completed',
        completed: true
      });
    }
  });
  
  // Sort by date
  events.sort((a, b) => new Date(a.date) - new Date(b.date));
  
  let html = '<div class="timeline">';
  
  events.forEach(event => {
    html += `
      <div class="timeline-item">
        <div class="timeline-marker ${event.completed ? 'completed' : ''}"></div>
        <div class="timeline-content">
          <div class="timeline-date">${formatDate(event.date)}</div>
          <div class="timeline-title">${event.title}</div>
          <div class="timeline-description">${event.description}</div>
        </div>
      </div>
    `;
  });
  
  html += '</div>';
  return html;
}

// Switch tab
function switchTab(tabName) {
  currentTab = tabName;
  
  // Update tab buttons
  document.querySelectorAll('.tab').forEach(tab => {
    tab.classList.remove('active');
  });
  event.target.classList.add('active');
  
  // Update tab content
  document.querySelectorAll('.tab-content').forEach(content => {
    content.classList.remove('active');
  });
  
  const tabMap = {
    'overview': 'tabOverview',
    'credentials': 'tabCredentials',
    'documents': 'tabDocuments',
    'cleanup': 'tabCleanup',
    'retainer': 'tabRetainer',
    'timeline': 'tabTimeline'
  };
  
  const activeTab = document.getElementById(tabMap[tabName]);
  if (activeTab) {
    activeTab.classList.add('active');
  }
}

// Back to dashboard
function backToDashboard() {
  document.getElementById('dashboard').style.display = 'block';
  document.getElementById('clientDetail').classList.remove('active');
  currentClientId = null;
  renderDashboard();
}

// Modal functions
function openNewClientModal() {
  document.getElementById('newClientModal').classList.add('active');
}

function closeNewClientModal() {
  document.getElementById('newClientModal').classList.remove('active');
  document.querySelector('#newClientModal form').reset();
}

// Add new client
function addNewClient(event) {
  event.preventDefault();
  
  const newClient = {
    id: nextClientId++,
    businessName: document.getElementById('businessName').value,
    ownerName: document.getElementById('ownerName').value,
    email: document.getElementById('email').value,
    phone: document.getElementById('phone').value,
    businessType: document.getElementById('businessType').value,
    businessStructure: document.getElementById('businessStructure').value,
    bankAccounts: parseInt(document.getElementById('bankAccounts').value) || 1,
    transactionsPerMonth: parseInt(document.getElementById('transactionsPerMonth').value) || 0,
    engagementDate: document.getElementById('engagementDate').value || new Date().toISOString().split('T')[0],
    cleanupPeriodStart: '',
    cleanupPeriodEnd: '',
    retainerFee: parseInt(document.getElementById('retainerFee').value) || 0,
    status: 'Onboarding',
    completionPercentage: 0,
    accessCredentials: JSON.parse(JSON.stringify(accessCredentialsTemplate)),
    documents: JSON.parse(JSON.stringify(documentChecklistTemplate)),
    cleanupSteps: JSON.parse(JSON.stringify(cleanupStepsTemplate)),
    monthlyClose: JSON.parse(JSON.stringify(monthlyCloseTemplate)),
    notes: ''
  };
  
  clients.push(newClient);
  closeNewClientModal();
  updateStats();
  renderDashboard();
}

// Update functions
function updateClientNotes(clientId, notes) {
  const client = clients.find(c => c.id === clientId);
  if (client) client.notes = notes;
}

function toggleCredentialStatus(clientId, index) {
  const client = clients.find(c => c.id === clientId);
  if (client) {
    const cred = client.accessCredentials[index];
    cred.status = cred.status === 'Received' ? 'Not Started' : 'Received';
    if (cred.status === 'Received' && !cred.dateReceived) {
      cred.dateReceived = new Date().toISOString().split('T')[0];
    }
    renderClientDetail(client);
  }
}

function updateCredentialStatus(clientId, index, status) {
  const client = clients.find(c => c.id === clientId);
  if (client) {
    client.accessCredentials[index].status = status;
  }
}

function updateCredentialDate(clientId, index, date) {
  const client = clients.find(c => c.id === clientId);
  if (client) {
    client.accessCredentials[index].dateReceived = date;
  }
}

function updateCredentialNotes(clientId, index, notes) {
  const client = clients.find(c => c.id === clientId);
  if (client) {
    client.accessCredentials[index].notes = notes;
  }
}

function toggleDocumentComplete(clientId, catIndex, itemIndex) {
  const client = clients.find(c => c.id === clientId);
  if (client) {
    const item = client.documents[catIndex].items[itemIndex];
    item.completed = !item.completed;
    if (item.completed && !item.dateReceived) {
      item.dateReceived = new Date().toISOString().split('T')[0];
    }
    renderClientDetail(client);
  }
}

function updateDocumentDate(clientId, catIndex, itemIndex, date) {
  const client = clients.find(c => c.id === clientId);
  if (client) {
    client.documents[catIndex].items[itemIndex].dateReceived = date;
  }
}

function updateDocumentNotes(clientId, catIndex, itemIndex, notes) {
  const client = clients.find(c => c.id === clientId);
  if (client) {
    client.documents[catIndex].items[itemIndex].notes = notes;
  }
}

function handleFileUpload(clientId, catIndex, itemIndex, files) {
  const client = clients.find(c => c.id === clientId);
  if (client) {
    const fileNames = Array.from(files).map(f => f.name);
    client.documents[catIndex].items[itemIndex].files.push(...fileNames);
    renderClientDetail(client);
  }
}

function updateCleanupStepStatus(clientId, index, status) {
  const client = clients.find(c => c.id === clientId);
  if (client) {
    client.cleanupSteps[index].status = status;
    if (status === 'Completed' && !client.cleanupSteps[index].endDate) {
      client.cleanupSteps[index].endDate = new Date().toISOString().split('T')[0];
    }
    // Update completion percentage
    const completed = client.cleanupSteps.filter(s => s.status === 'Completed').length;
    client.completionPercentage = Math.round((completed / client.cleanupSteps.length) * 100);
    renderClientDetail(client);
  }
}

function updateCleanupStepAssignment(clientId, index, assignedTo) {
  const client = clients.find(c => c.id === clientId);
  if (client) {
    client.cleanupSteps[index].assignedTo = parseInt(assignedTo);
  }
}

function updateCleanupStepStartDate(clientId, index, date) {
  const client = clients.find(c => c.id === clientId);
  if (client) {
    client.cleanupSteps[index].startDate = date;
  }
}

function updateCleanupStepEndDate(clientId, index, date) {
  const client = clients.find(c => c.id === clientId);
  if (client) {
    client.cleanupSteps[index].endDate = date;
  }
}

function toggleMonthlyCloseItem(clientId, catIndex, itemIndex) {
  const client = clients.find(c => c.id === clientId);
  if (client) {
    const item = client.monthlyClose[catIndex].items[itemIndex];
    item.completed = !item.completed;
    if (item.completed && !item.completionDate) {
      item.completionDate = new Date().toISOString().split('T')[0];
    }
    renderClientDetail(client);
  }
}

function updateMonthlyCloseAssignment(clientId, catIndex, itemIndex, assignedTo) {
  const client = clients.find(c => c.id === clientId);
  if (client) {
    client.monthlyClose[catIndex].items[itemIndex].assignedTo = parseInt(assignedTo);
  }
}

function updateMonthlyCloseDate(clientId, catIndex, itemIndex, date) {
  const client = clients.find(c => c.id === clientId);
  if (client) {
    client.monthlyClose[catIndex].items[itemIndex].completionDate = date;
  }
}

function updateMonthlyCloseNotes(clientId, catIndex, itemIndex, notes) {
  const client = clients.find(c => c.id === clientId);
  if (client) {
    client.monthlyClose[catIndex].items[itemIndex].notes = notes;
  }
}

// Initialize app on load
initApp();