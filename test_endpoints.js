const axios = require('axios');

const baseURL = 'http://localhost:3000';
let token = '';

const runTests = async () => {
    try {
        console.log('--- Starting Tests ---');

        // 1. Register
        console.log('\n1. Testing Register...');
        const registerRes = await axios.post(`${baseURL}/auth/register`, {
            nombre: 'Test User',
            correo: `test${Date.now()}@example.com`,
            password: 'password123',
            genero: 'M',
            carrera: 'Ingenieria',
            ciclo: '5',
            consentimiento: true
        });
        console.log('Register Success:', registerRes.data.success);

        // 2. Login
        console.log('\n2. Testing Login...');
        const loginRes = await axios.post(`${baseURL}/auth/login`, {
            correo: registerRes.data.data.correo,
            password: 'password123'
        });
        token = loginRes.data.data.token;
        console.log('Login Success:', loginRes.data.success);
        console.log('Token:', token ? 'Received' : 'Missing');

        const headers = { Authorization: `Bearer ${token}` };

        // 3. Create Diary Entry
        console.log('\n3. Testing Create Diary Entry...');
        const diaryRes = await axios.post(`${baseURL}/diary`, {
            emocion: 'Feliz',
            intensidad: 4,
            contexto: 'Examen aprobado',
            momento_dia: 'manana',
            reflexion: 'Me siento muy bien'
        }, { headers });
        console.log('Create Entry Success:', diaryRes.data.success);

        // 4. Get Diary Entries
        console.log('\n4. Testing Get Diary Entries...');
        const getDiaryRes = await axios.get(`${baseURL}/diary`, { headers });
        console.log('Get Entries Success:', getDiaryRes.data.success);
        console.log('Entries Count:', getDiaryRes.data.data.length);

        // 5. Create Assessment (Pretest)
        console.log('\n5. Testing Create Pretest...');
        const pretestRes = await axios.post(`${baseURL}/assessments/pretest`, {
            pss10_score: 20,
            satisfaccion_score: 30,
            respuestas_pss10: { q1: 2, q2: 3 }
        }, { headers });
        console.log('Create Pretest Success:', pretestRes.data.success);

        // 6. Get Reports Overview
        console.log('\n6. Testing Get Reports Overview...');
        const reportsRes = await axios.get(`${baseURL}/reports/overview`, { headers });
        console.log('Get Reports Success:', reportsRes.data.success);
        console.log('Overview Data:', reportsRes.data.data);

        console.log('\n--- Tests Completed Successfully ---');
    } catch (error) {
        console.error('\n--- Test Failed ---');
        if (error.response) {
            console.error('Status:', error.response.status);
            console.error('Data:', error.response.data);
        } else {
            console.error('Error:', error.message);
        }
    }
};

runTests();
