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
            modelBackbone: {
                primary: "google/gemini-2.0-flash-001",
                reasoningMoE: "deepseek/deepseek-chat (DeepSeek-V3)",
                indicMultilingual: "qwen/qwen-2.5-72b-instruct (Qwen)",
                indicLocal: "sarvam-m"
            },
            trainingPipeline: {
                framework: "LLaMA-Factory / ShareGPT / Alpaca",
                exportEndpoint: "/api/mansi/export"
            }
        };
    }
}
