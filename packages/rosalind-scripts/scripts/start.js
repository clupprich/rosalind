require('shelljs/global');

cd(__dirname);
cd('../../..');
exec('meteor --settings settings.json', {async: true});
exec('electron packages/rosalind-native/', {async: true});
