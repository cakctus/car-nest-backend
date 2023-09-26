import { diskStorage } from 'multer';
import { extname } from 'path';

export const carsMulterConfig = {
  storage: diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'media/pics/cars');
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(
        null,
        file.fieldname + '-' + uniqueSuffix + extname(file.originalname),
      );
    },
  }),
  limits: {
    fileSize: 100 * 1024 * 1024,
  },
};

export const motosMulterConfig = {
  storage: diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'media/pics/moto');
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(
        null,
        file.fieldname + '-' + uniqueSuffix + extname(file.originalname),
      );
    },
  }),
};

export const busMulterConfig = {
  storage: diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'media/pics/bus');
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(
        null,
        file.fieldname + '-' + uniqueSuffix + extname(file.originalname),
      );
    },
  }),
};

export const truckMulterConfig = {
  storage: diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'media/pics/truck');
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(
        null,
        file.fieldname + '-' + uniqueSuffix + extname(file.originalname),
      );
    },
  }),
};

export const tractorMulterConfig = {
  storage: diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'media/pics/tractor');
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(
        null,
        file.fieldname + '-' + uniqueSuffix + extname(file.originalname),
      );
    },
  }),
};

export const constructionMulterConfig = {
  storage: diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'media/pics/construction');
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(
        null,
        file.fieldname + '-' + uniqueSuffix + extname(file.originalname),
      );
    },
  }),
};

export const trailerMulterConfig = {
  storage: diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'media/pics/trailer');
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(
        null,
        file.fieldname + '-' + uniqueSuffix + extname(file.originalname),
      );
    },
  }),
};

export const tireMulterConfig = {
  storage: diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'media/pics/tire');
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(
        null,
        file.fieldname + '-' + uniqueSuffix + extname(file.originalname),
      );
    },
  }),
};

export const partsMulterConfig = {
  storage: diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'media/pics/parts');
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(
        null,
        file.fieldname + '-' + uniqueSuffix + extname(file.originalname),
      );
    },
  }),
};

export const truckPartsMulterConfig = {
  storage: diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'media/pics/truck_parts');
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(
        null,
        file.fieldname + '-' + uniqueSuffix + extname(file.originalname),
      );
    },
  }),
};

export const batteryMulterConfig = {
  storage: diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'media/pics/battery');
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(
        null,
        file.fieldname + '-' + uniqueSuffix + extname(file.originalname),
      );
    },
  }),
};

export const serviceMulterConfig = {
  storage: diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'media/pics/service');
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(
        null,
        file.fieldname + '-' + uniqueSuffix + extname(file.originalname),
      );
    },
  }),
};
