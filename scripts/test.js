require('shelljs/global');

cd(__dirname);
cd('../server/');
exec('meteor --test --release velocity:METEOR@1.1.0.3_1');
