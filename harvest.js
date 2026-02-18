require('dotenv').config({ path: '.env.local' });
const { seedNeuralKnowledge } = require('./src/actions/mansi-neural-seeder');

/**
 * CREDIT BURN SCRIPT
 * Run this locally via `node harvest.js` to fill your database memory.
 */
async function runHarvest() {
    console.log('--- MANSI NEURAL HARVESTER STARTING ---');
    console.log('Objective: Synthesizing Internet Data into Persona memory...');

    try {
        const result = await seedNeuralKnowledge();
        console.log('--- HARVEST COMPLETE ---');
        console.log(`Successfully seeded ${result.seeded_count} deep interaction memories.`);
    } catch (e) {
        console.error('Harvest Interrupted:', e.message);
    }
}

runHarvest();
