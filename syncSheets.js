import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
// טעינת פרטי ההזדהות מהקובץ שהורדת מגוגל
const creds = JSON.parse(fs.readFileSync('./credentials.json', 'utf8'));

// ה-ID של הגליון שלך (מתוך הקישור ששלחת)
const SPREADSHEET_ID = '14hzi_EZrAYGVuYISCD0Jl-1Z_UvegoKxQN3jLrs-pKk';

// לאן לשמור את התוצאה (בתוך תיקיית src כדי שהאתר יוכל לקרוא את זה)
const OUTPUT_PATH = path.join(__dirname, 'src', 'data.json');

async function syncData() {
  try {
    console.log('🔄 מתחבר לגוגל שיטס...');

    // הגדרת ההרשאות
    const serviceAccountAuth = new JWT({
      email: creds.client_email,
      key: creds.private_key,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const doc = new GoogleSpreadsheet(SPREADSHEET_ID, serviceAccountAuth);
    
    // טעינת המידע מהגליון
    await doc.loadInfo(); 
    console.log(`✅ מחובר לגליון: ${doc.title}`);

    // גישה ללשונית הראשונה (Index 0)
    const sheet = doc.sheetsByIndex[0]; 
    const rows = await sheet.getRows();

    // הפיכת הנתונים לפורמט JSON נקי (מערך של אובייקטים)
    const data = rows.map(row => row.toObject());

    // בדיקה שתיקיית src קיימת, ואם לא - יצירתה
    if (!fs.existsSync(path.join(__dirname, 'src'))) {
      fs.mkdirSync(path.join(__dirname, 'src'));
    }

    // כתיבת הנתונים לקובץ data.json
    fs.writeFileSync(OUTPUT_PATH, JSON.stringify(data, null, 2), 'utf8');

    console.log(`🚀 הצלחה! נוצר קובץ נתונים חדש ב: ${OUTPUT_PATH}`);
    console.log(`📊 נמשכו ${data.length} שורות מהגליון.`);

  } catch (error) {
    console.error('❌ שגיאה בסנכרון:', error.message);
    if (error.message.includes('403')) {
        console.error('💡 טיפ: וודא ששיתפת את הגליון עם המייל של ה-Service Account (הכתובת ב-credentials.json).');
    }
  }
}

syncData();
