import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
    cloud_name: 'dr6z24wrf',
    api_key: '715632636999398',
    api_secret: 'Mr33zSt5EXO4i-y5w2_DqhcK0mc',
});

export default cloudinary;
