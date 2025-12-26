
# AetherLabs: Thermal Intelligence Suite
### Pulse Coding Assignment — Senior AI Engineer Submission

AetherLabs is a specialized product intelligence platform designed for the development and marketing of **Human Cooling Sole** technology. This suite demonstrates high-performance integration of the Gemini API to handle unstructured feedback analysis, generative marketing asset synthesis, and R&D data security.

## 🚀 Key Modules

### 1. Thermal Sentiment Analytics (Pulse Core)
Utilizes `gemini-3-flash-preview` to perform deep-tissue analysis of customer feedback. It categorizes unstructured reviews into critical thermal performance metrics such as *Heat Dissipation*, *Phase Change Efficiency*, and *Moisture Wicking*.

### 2. AetherVisuals Lab
A generative marketing pipeline using `gemini-2.5-flash-image`. It allows engineers and marketers to synthesize high-fidelity product visualizations in varied environments (e.g., volcanic terrain vs. arctic labs) to demonstrate thermal contrast without the cost of physical photoshoots.

### 3. Extraction Agent (Hierarchy Mapping)
An intelligent agent that crawls documentation or raw R&D logs to extract structured hierarchical data. This module demonstrates the ability to transform chaotic documentation into actionable JSON-based module structures.

### 4. R&D Security (Video Guardian)
A vision-logic pipeline that audits R&D testing footage. It assesses the sensitivity of visual data to prevent intellectual property leaks regarding proprietary cooling fan geometries or chemical compositions.

## 🛠 Technical Stack
- **Frontend**: React 19 (Hooks, Functional Components)
- **Styling**: Tailwind CSS with custom Frost-Glass components
- **AI Engine**: Google GenAI SDK (@google/genai)
- **Charting**: Recharts for real-time telemetry visualization
- **Icons**: FontAwesome 6 Pro

## 🧬 AI Implementation Details
The suite follows strict **agentic design patterns**:
- **Schema-Driven Output**: All text-based AI responses use `responseSchema` with OpenAPI `Type` definitions to ensure zero-fail JSON parsing.
- **Image Synthesis**: Prompt engineering includes "frost-lines" and "thermal vapor" keywords to maintain a cohesive brand identity across generated assets.
- **Security Logic**: Sensitivity scores are calculated through a multi-step reasoning prompt that evaluates background objects and proprietary markers.

## 🏁 Setup
1. Ensure `process.env.API_KEY` is configured in your environment.
2. Deployment is optimized for ESM-based browsers.
3. No build step required; uses direct ESM imports for maximum performance and portability.

---
*Developed for the Pulse Recruitment Pipeline. Confidentiality and IP rights reserved for AetherLabs Engineering.*
