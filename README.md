# TrustLens AI

TrustLens AI is an AI-powered transparency and trust validation platform for enterprise device management systems such as Microsoft Intune and VMware Workspace ONE.

The platform demonstrates explainable AI principles by providing:

* AI-generated remediation recommendations
* Confidence calibration
* Historical precedent analysis (Trust Time Machine)
* Devil's Advocate counter-arguments
* Human-in-the-loop decision controls
* Audit trails and incident reports
* Multiple AI autonomy modes (Collaborative, Co-Pilot, Autonomous)

Built for the Dell AI Trust & Transparency Challenge.

---

## Tech Stack

### Frontend

* React
* TypeScript
* Vite
* Tailwind CSS
* Framer Motion
* Lucide React

### Backend

* Node.js
* Express.js

### AI Engine

* Python
* Faker
* Hugging Face Transformers
* Synthetic Security Telemetry

---

## Project Structure

```bash
TrustLensAI/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── data/
│   ├── python/
│   ├── server.js
│   └── package.json
│
├── ai-engine/
│   ├── outputs/
│   ├── generate_data.py
│   ├── recommendations_engine.py
│   ├── confidence.py
│   ├── similarity.py
│   └── devil_advocate.py
│
└── README.md
```

---

# Installation

## 1. Clone Repository

```bash
git clone https://github.com/Aryanbharti214/TrustLensAI/
cd TrustLensAI
```

---

## 2. Setup Python Environment

Navigate to AI Engine:

```bash
cd ai-engine
```

Create virtual environment:

```bash
python -m venv venv
```

Activate environment:

### Mac/Linux

```bash
source venv/bin/activate
```

### Windows

```bash
venv\Scripts\activate
```

Install dependencies:

```bash
pip install faker transformers torch sentencepiece
```

---

## 3. Generate Synthetic Data

Inside ai-engine:

```bash
python generate_data.py
```

Generate recommendations:

```bash
python recommendations_engine.py
```

Expected output:

```bash
15 recommendations generated.
```

---

## 4. Setup Backend

Navigate to backend:

```bash
cd ../backend
```

Install dependencies:

```bash
npm install
```

Start server:

```bash
node server.js
```

Expected output:

```bash
Server running on port 3001
```

Backend URL:

```text
http://localhost:3001
```

---

## 5. Setup Frontend

Navigate to frontend:

```bash
cd ../frontend
```

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Expected output:

```bash
Local: http://localhost:5173
```

Open:

```text
http://localhost:5173
```

---

# Running The Complete Project

### Terminal 1

```bash
cd backend
node server.js
```

### Terminal 2

```bash
cd frontend
npm run dev
```

### Terminal 3 (Optional)

```bash
cd ai-engine
source venv/bin/activate
python recommendations_engine.py
```

---

# Core Features

## AI Recommendation Engine

Generates security recommendations using:

* Device telemetry
* Patch status
* Historical quarantine decisions
* Synthetic enterprise logs

---

## Trust Time Machine

Shows:

* Similar historical incidents
* Decision outcomes
* Confidence calibration
* Historical accuracy

---

## Devil's Advocate

Provides a mandatory counter-argument against every recommendation.

Example:

```text
Before quarantining this device, verify whether maintenance activity could explain the unusual behavior.
```

---

## Confidence Calibration

Instead of showing raw model confidence:

```text
87%
```

TrustLens AI explains:

```text
Wrong 6.7% of the time in similar cases.
```

---

## AI Autonomy Modes

### Collaborative

Human approves every recommendation.

### Co-Pilot

Medium-risk recommendations can be auto-resolved.

### Autonomous

Non-critical recommendations can be auto-executed while maintaining audit logs.

---

## Incident Reports

Captures:

* What happened
* Why it happened
* Failed safeguards
* Future prevention recommendations

---

## Audit Trail

Complete traceability of:

* System actions
* AI actions
* Human decisions

---

# Future Improvements

* Live Hugging Face inference
* SHAP explainability visualizations
* Real Microsoft Intune integration
* Real Workspace ONE integration
* Vector similarity search
* LLM-powered incident summaries

---

# Team

Developed as part of the Dell AI Trust & Transparency Challenge.

TrustLens AI demonstrates how enterprise AI systems can remain transparent, auditable, and accountable while assisting human decision-makers.
