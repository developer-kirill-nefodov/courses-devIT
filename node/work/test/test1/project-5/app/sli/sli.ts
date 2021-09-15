const fs = require('fs');
const os = require('os');

//@ts-ignore
const path = require('path');

const readline = require('readline');
const child = require('child_process');

const {Client} = require('ssh2');

//@ts-ignore
const Store = require('./Store');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function Menu(page: string | void, ...data) {
    switch (page) {
        case 'active': {
            //@ts-ignore
            const newArr = Store.getActive();
            activeT(newArr);
        }
            break;
        case 'connect': {
            const newArr = readFile(path.join(__dirname, 'test.txt'));
            connect(newArr)
        }
            break;
        case 'remote': {
            //@ts-ignore
            const arrPort = Store.getPort();
            remoteMachine(arrPort, data[0]);
        }
            break;
        case 'tunnel': {
            tunnel(data[0], data[1]);
        }
            break;
        default: {
            Menu('active');
        }
    }
}

function activeT(arr) {
    console.clear()

    console.log('/ --- active tunnel --- /')
    console.log
    (`\
   ___________________________
id: | <PORT>   |   <USERNAME> |
   ___________________________\
`)

    if (arr.length) {
        for (let key of arr) {
            for (let idx = 0; idx < arr.length - 1; idx++) {
                console.log(`[${idx}]| ${key.port}  |  ${key.username} |`)
            }
            console.log(`| ${key.port}  |  ${key.username} |`)
        }
        console.log('<--- [c] new tunnel --->')
        console.log('<--- [d+n] --->')

        rl.question('[?]', (label) => {
            if (label === 'c') {
                Menu('connect');
            } else if (label[0] === 'd') {
                let num = arr[label.split('d', label.length)[1]]

                if (num <= arr.length - 1) {
                    child.execSync(`ps -lef | grep ssh | grep ${arr[num]} | awk "{print \\$2}" | xargs kill`)

                }
            } else {
                activeT(arr);
            }
        })
    } else {
        console.log('<--- new tunnel = [c] --->');

        rl.question('[c]', (label) => {
            if (label === 'c') {
                Menu('connect');
            } else {
                activeT(arr);
            }
        })
    }
}

function connect(arr) {
    console.clear()

    console.table(arr);

    rl.question('[num]', (number) => {

        if (number === 'c') {
            Menu('active');
        } else {
            if (number <= arr.length - 1) {
                try {
                    let obj = {
                        host: arr[number].host,
                        port: arr[number].port,
                        username: arr[number].username,
                        password: arr[number].password
                    }

                    fn(obj)
                } catch (e) {
                    console.log('((((9');
                    setTimeout(() => Menu('connect'), 2000)
                }

            } else {
                console.log('((((9');
                setTimeout(() => Menu('connect'), 2000)
            }
        }
    })
}

function fn(obj) {
    const conn = new Client();

    conn.on('ready', () => {
        const ssh = fs.readFileSync(path.join(os.homedir(), '/.ssh/id_rsa.pub'));
        conn.exec(`echo '${ssh}' >> ~/.ssh/authorized_keys`, {}, (err, stream) => {
            if (err) throw err;

            stream.on('close', () => conn.end());
        });

        conn.exec("netstat -lpt4en | awk '{print $4, $NF}'", {}, (err, stream) => {
            if (err) console.error(err);

            stream.on('data', (data) => {
                console.log(data.toString());

                //@ts-ignore
                Store.upDateRemotePort(data);
                Menu('remote', obj);
            });

            stream.on('close', () => conn.end());
        });

    }).connect(obj);

    conn.on('error', (data) => {
        console.log('ERROR CONNECT')
        setTimeout(() => Menu('connect'), 2000)
    })
}

function remoteMachine(arrPort, obj) {
    console.clear()

    for (let key of arrPort) console.log(`[${key}]`)
    console.log('\n')

    rl.question('[?]', (port) => {
        let val = false;

        for (let idx of arrPort) {
            if (port === idx) val = true;
        }

        if (val) {
            Menu('tunnel', port, obj)
        } else {
            remoteMachine(arrPort, obj);
        }
    })
}

function tunnel(PORT, obj) {
    const {host, port, username, password} = obj;

    console.clear()

    console.log('Port\n')
    rl.question(`[${PORT}]: `, (newPort) => {

        if (2999 < newPort && newPort > 10000) {
            console.log(`ssh -L ${newPort}:localhost:${PORT} ${username}@${host}`);


            const childTunnel = child.spawn(`ssh -tt -NL ${newPort}:localhost:${PORT} ${username}@${host}`, {shell: true});


            childTunnel.stderr.on('data', (data) => {
                console.log('works')
                if (data.includes('cannot')) {
                    console.log(`\nWarning: The tunnel has not been forwarded, remove the connection on port ${port}\n`);
                } else {
                    //@ts-ignore
                    Store.addActive({host: host, port: PORT, username: username, password: password});

                    Menu('active');
                }
            });

        } else {
            console.log('(((((9')
            setTimeout(() => tunnel(PORT, obj), 2000)
        }


    })


}

function deleteTunnel(arr) {
    console.clear()

    const newArr = [];

    for (let key of arr) newArr.push({port: key.port, username: key.username})

    console.table(newArr);
    console.log('<---num delete--->')
    rl.question('[d]', (num) => {
        if (num <= newArr.length - 1) {
        }
    })
}

function readFile(file) {
    let arr = [], data = [];

    fs.readFileSync(file, 'utf-8').split(/\n/).forEach((value) => {
        arr.push(value);
    })

    for (let key of arr) {
        let idx = key.split(' ')
        if (idx.length === 4) {
            data.push({host: idx[0], port: idx[1], username: idx[2], password: idx[3]})
        }
    }
    return data;
}

Menu()
