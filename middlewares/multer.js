const { error } = require('console');
const multer = require('multer');
const path = require('path');

//storage config
const storage= multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, 'uploads/'); //local uploads folder
    },
    filename: (req, file, cb) =>{
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName );
    }
});

//filter images
// const fileFilter = (req, file, cb)=>{
//     const allowed = ['image/jpeg', 'image/png', 'image/webp'];
//     if(allowed.includes(file.mimetype)) cb(null, true);
//     else cb(new Error('only image files(jpeg , png or webp) allowed'), false);
// };

const upload = multer({storage});
module.exports= upload;