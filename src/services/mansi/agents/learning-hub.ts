// src/services/mansi/agents/learning-hub.ts
/**
 * 🌐 Mansi Unified Learning Hub
 * Coordinates all 9 Learning Repositories + Qwen & DeepSeek-V3 architectures:
 * 
 * 1. Letta (letta-ai/letta) -> Stateful Core Memory (Persona, Human, Workshop, Archival)
 * 2. Indic NLP (AI4Bharat, IndicTok) -> Amdavadi Gujlish Transliteration & Slang Lexicon
 * 3. PolyAI & KuralHub -> Conversational Intent Classification & Emotion Sensing
 * 4. Founder Marketing & CRO (Marketing-for-Founders, Corey Haines marketingskills) -> PAS & Conversion Hooks
 * 5. Model Distillation & SFT (LLaMA-Factory, Open-Generative-AI) -> Alpaca & ShareGPT Dataset Exporter
 * 6. Next-Gen LLM Core -> Qwen 2.5/3 + DeepSeek-V3 Reasoning Chains
 */

import { MansiLettaMemory, DEFAULT_PERSONA_BLOCK, DEFAULT_WORKSHOP_BLOCK } from '../memory/letta-core';
import { IndicNLP, AMDAVADI_LEXICON, DIAGNOSTIC_DECISION_TREES } from '../nlp/indic-intel';
import { MansiGrowthEngine, CRO_PLAYBOOKS } from '../marketing/growth-copy';
import { LLaMAFactoryExporter } from '../training/llama-factory-export';

import { WazuhSecurityEngine } from '../security/wazuh-siem';
import { DefectDojoAppSec } from '../security/defect-dojo';

export class MansiLearningHub {
    /**
     * Get real-time telemetry on Mansi's multi-repo learning stack.
     */
    static getTelemetry() {
        const human = MansiLettaMemory.getHumanProfile();
        return {
            statefulMemory: {
                engine: "Letta / MemGPT Architecture",
                persona: DEFAULT_PERSONA_BLOCK.name,
                currentRider: human.name || "Anonymous Guest",
                riderBike: human.bikeModel || "Not logged",
                intentScore: human.visitIntentScore,
                activeIssues: human.reportedIssues
            },
            indicNLP: {
                engine: "AI4Bharat + IndicTok + PolyAI + KuralHub",
                lexiconTerms: Object.keys(AMDAVADI_LEXICON).length,
                diagnosticTrees: Object.keys(DIAGNOSTIC_DECISION_TREES).length,
                supportedDialects: ["Gujlish", "Hinglish", "English", "Pure Gujarati"]
            },
            growthCRO: {
                engine: "Marketing-for-Founders + Corey Haines MarketingSkills",
                activePlaybooks: Object.keys(CRO_PLAYBOOKS),
                primaryCoupon: "MOTOFIT-RIDER-5"
            },
            cybersecurityProtocols: {
                siemEngine: "Wazuh SIEM Open Source Protocol (github.com/wazuh/wazuh)",
                vulnerabilityManagement: "DefectDojo AppSec Protocol (github.com/DefectDojo/django-DefectDojo)",
                wazuhStatus: WazuhSecurityEngine.getSIEMSummary().status,
                defectDojoPosture: DefectDojoAppSec.generatePostureReport().overallPosture,
                activeControls: [
                    "Wazuh Real-time Decoders (Prompt Injection, SQLi, XSS, Path Traversal)",
                    "DefectDojo OWASP LLM01 Guardrails & CVSS v3.1 Registry",
                    "PII Lead Data Protection & Sanitization"
                ]
            },
            modelBackbone: {
                prioritizedFlagship1: "qwen/qwen-2.5-72b-instruct (Qwen 2.5 72B)",
                prioritizedFlagship2: "deepseek/deepseek-chat (DeepSeek-V3)",
                diagnosticReasoning: "deepseek/deepseek-r1 (DeepSeek-R1)",
                serverFallback: "google/gemini-2.0-flash-001 / gpt-4o-mini",
                indicLocal: "sarvam-m"
            },
            trainingPipeline: {
                framework: "LLaMA-Factory / ShareGPT / Alpaca",
                exportEndpoint: "/api/mansi/export"
            },
            voiceEngine: {
                ttsPrimary: "Sarvam Bulbul v3 (gu-IN / hi-IN)",
                ttsFallback: "OpenAI Nova (tts-1)",
                sttPrimary: "OpenAI Whisper + Sarvam Saaras (Indic Garage Vocab)",
                prosodyAdaptation: "KuralHub Speech Emotion Prosody (Pace/Pitch Modulation)",
                fineTuneSchema: "AI4Bharat IndicTTS + Qwen2/3-Audio Manifest"
            }
        };
    }
}
