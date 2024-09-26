import alias from '@rollup/plugin-alias';
import { babel } from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import postcss from 'rollup-plugin-postcss';
import { terser } from 'rollup-plugin-terser';

import fs from 'fs-extra';
import path from 'path';

import pkg from './package.json';

let entries = [];

let core = {};

const NPM_LINK = process.env.NPM_LINK === 'true';

// alias entries
const ALIAS_ICON_COMPONENT_ENTRIES = [
    { find: '../../iconbase/IconBase', replacement: 'primereactnew/dist/iconbase' },
    { find: '../icons/angledoubledown', replacement: 'primereactnew/dist/icons/angledoubledown' },
    { find: '../icons/angledoubleleft', replacement: 'primereactnew/dist/icons/angledoubleleft' },
    { find: '../icons/angledoubleright', replacement: 'primereactnew/dist/icons/angledoubleright' },
    { find: '../icons/angledoubleup', replacement: 'primereactnew/dist/icons/angledoubleup' },
    { find: '../icons/angledown', replacement: 'primereactnew/dist/icons/angledown' },
    { find: '../icons/angleleft', replacement: 'primereactnew/dist/icons/angleleft' },
    { find: '../icons/angleright', replacement: 'primereactnew/dist/icons/angleright' },
    { find: '../icons/angleup', replacement: 'primereactnew/dist/icons/angleup' },
    { find: '../icons/arrowdown', replacement: 'primereactnew/dist/icons/arrowdown' },
    { find: '../icons/arrowup', replacement: 'primereactnew/dist/icons/arrowup' },
    { find: '../icons/ban', replacement: 'primereactnew/dist/icons/ban' },
    { find: '../icons/bars', replacement: 'primereactnew/dist/icons/bars' },
    { find: '../icons/calendar', replacement: 'primereactnew/dist/icons/calendar' },
    { find: '../icons/check', replacement: 'primereactnew/dist/icons/check' },
    { find: '../icons/chevrondown', replacement: 'primereactnew/dist/icons/chevrondown' },
    { find: '../icons/chevronleft', replacement: 'primereactnew/dist/icons/chevronleft' },
    { find: '../icons/chevronright', replacement: 'primereactnew/dist/icons/chevronright' },
    { find: '../icons/chevronup', replacement: 'primereactnew/dist/icons/chevronup' },
    { find: '../icons/exclamationtriangle', replacement: 'primereactnew/dist/icons/exclamationtriangle' },
    { find: '../icons/eye', replacement: 'primereactnew/dist/icons/eye' },
    { find: '../icons/eyeslash', replacement: 'primereactnew/dist/icons/eyeslash' },
    { find: '../icons/filter', replacement: 'primereactnew/dist/icons/filter' },
    { find: '../icons/filterslash', replacement: 'primereactnew/dist/icons/filterslash' },
    { find: '../icons/infocircle', replacement: 'primereactnew/dist/icons/infocircle' },
    { find: '../icons/minus', replacement: 'primereactnew/dist/icons/minus' },
    { find: '../icons/pencil', replacement: 'primereactnew/dist/icons/pencil' },
    { find: '../icons/plus', replacement: 'primereactnew/dist/icons/plus' },
    { find: '../icons/refresh', replacement: 'primereactnew/dist/icons/refresh' },
    { find: '../icons/search', replacement: 'primereactnew/dist/icons/search' },
    { find: '../icons/searchminus', replacement: 'primereactnew/dist/icons/searchminus' },
    { find: '../icons/searchplus', replacement: 'primereactnew/dist/icons/searchplus' },
    { find: '../icons/sortalt', replacement: 'primereactnew/dist/icons/sortalt' },
    { find: '../icons/sortamountdown', replacement: 'primereactnew/dist/icons/sortamountdown' },
    { find: '../icons/sortamountupalt', replacement: 'primereactnew/dist/icons/sortamountupalt' },
    { find: '../icons/spinner', replacement: 'primereactnew/dist/icons/spinner' },
    { find: '../icons/star', replacement: 'primereactnew/dist/icons/star' },
    { find: '../icons/starfill', replacement: 'primereactnew/dist/icons/starfill' },
    { find: '../icons/thlarge', replacement: 'primereactnew/dist/icons/thlarge' },
    { find: '../icons/times', replacement: 'primereactnew/dist/icons/times' },
    { find: '../icons/timescircle', replacement: 'primereactnew/dist/icons/timescircle' },
    { find: '../icons/trash', replacement: 'primereactnew/dist/icons/trash' },
    { find: '../icons/undo', replacement: 'primereactnew/dist/icons/undo' },
    { find: '../icons/upload', replacement: 'primereactnew/dist/icons/upload' },
    { find: '../icons/windowmaximize', replacement: 'primereactnew/dist/icons/windowmaximize' },
    { find: '../icons/windowminimize', replacement: 'primereactnew/dist/icons/windowminimize' }
];

const CORE_PASSTHROUGH_DEPENDENCIES = [
    { find: '../passthrough', replacement: 'primereactnew/dist/passthrough' },
    { find: '../passthrough/tailwind', replacement: 'primereactnew/dist/passthrough/tailwind' }
];

const ALIAS_COMPONENT_ENTRIES = [
    { find: '../utils/Utils', replacement: 'primereactnew/dist/utils' },
    { find: '../api/Api', replacement: 'primereactnew/dist/api' },
    { find: '../componentbase/ComponentBase', replacement: 'primereactnew/dist/componentbase' },
    { find: '../hooks/Hooks', replacement: 'primereactnew/dist/hooks' },
    { find: '../ripple/Ripple', replacement: 'primereactnew/dist/ripple' },
    { find: '../csstransition/CSSTransition', replacement: 'primereactnew/dist/csstransition' },
    { find: '../portal/Portal', replacement: 'primereactnew/dist/portal' },
    { find: '../keyfilter/KeyFilter', replacement: 'primereactnew/dist/keyfilter' },
    ...ALIAS_ICON_COMPONENT_ENTRIES,
    { find: '../tooltip/Tooltip', replacement: 'primereactnew/dist/tooltip' },
    { find: '../virtualscroller/VirtualScroller', replacement: 'primereactnew/dist/virtualscroller' },
    { find: '../terminalservice/TerminalService', replacement: 'primereactnew/dist/terminalservice' },
    { find: '../overlayservice/OverlayService', replacement: 'primereactnew/dist/overlayservice' },
    { find: '../checkox/Checkbox', replacement: 'primereactnew/dist/checkbox' },
    { find: '../button/Button', replacement: 'primereactnew/dist/button' },
    { find: '../inputtext/InputText', replacement: 'primereactnew/dist/inputtext' },
    { find: '../inputnumber/InputNumber', replacement: 'primereactnew/dist/inputnumber' },
    { find: '../messages/Messages', replacement: 'primereactnew/dist/messages' },
    { find: '../progressbar/ProgressBar', replacement: 'primereactnew/dist/progressbar' },
    { find: '../dropdown/Dropdown', replacement: 'primereactnew/dist/dropdown' },
    { find: '../dialog/Dialog', replacement: 'primereactnew/dist/dialog' },
    { find: '../paginator/Paginator', replacement: 'primereactnew/dist/paginator' },
    { find: '../tree/Tree', replacement: 'primereactnew/dist/tree' },
    ...CORE_PASSTHROUGH_DEPENDENCIES
];

// dependencies
const GLOBAL_DEPENDENCIES = {
    react: 'React',
    'react-dom': 'ReactDOM',
    'react-transition-group': 'ReactTransitionGroup'
};

const GLOBAL_COMPONENT_DEPENDENCIES = {
    ...GLOBAL_DEPENDENCIES,
    ...(NPM_LINK ? [] : ALIAS_COMPONENT_ENTRIES.reduce((acc, cur) => ({ ...acc, [cur.replacement]: cur.replacement.replaceAll('/', '.') }), {}))
};

// externals
const EXTERNAL = ['react', 'react-dom', 'react-transition-group', '@babel/runtime', '@fullcalendar/core', 'chart.js/auto', 'quill'];

const EXTERNAL_COMPONENT = [...EXTERNAL, ...(NPM_LINK ? [] : ALIAS_COMPONENT_ENTRIES.map((entries) => entries.replacement))];

// plugins
const BABEL_PLUGIN_OPTIONS = {
    exclude: 'node_modules/**',
    presets: ['@babel/preset-env', '@babel/preset-react'],
    plugins: ['@babel/plugin-transform-runtime', '@babel/plugin-proposal-class-properties'],
    skipPreflightCheck: true,
    babelHelpers: 'runtime',
    babelrc: false
};

const ALIAS_PLUGIN_OPTIONS_FOR_COMPONENT = {
    entries: ALIAS_COMPONENT_ENTRIES
};

const REPLACE_PLUGIN_OPTIONS = {
    'process.env.NODE_ENV': JSON.stringify('production'),
    preventAssignment: true
};

const RESOLVE_PLUGIN_OPTIONS = {
    extensions: ['.js']
};

const COMMONJS_PLUGIN_OPTIONS = {
    exclude: process.env.INPUT_DIR + '**',
    sourceMap: false
};

const POSTCSS_PLUGIN_OPTIONS = {
    sourceMap: false
};

const TERSER_PLUGIN_OPTIONS = {
    compress: {
        keep_infinity: true,
        pure_getters: true,
        reduce_funcs: false
    }
};

const PLUGINS = [replace(REPLACE_PLUGIN_OPTIONS), resolve(RESOLVE_PLUGIN_OPTIONS), commonjs(COMMONJS_PLUGIN_OPTIONS), babel(BABEL_PLUGIN_OPTIONS), postcss(POSTCSS_PLUGIN_OPTIONS)];

const PLUGINS_COMPONENT = NPM_LINK ? PLUGINS : [alias(ALIAS_PLUGIN_OPTIONS_FOR_COMPONENT), ...PLUGINS];

function addEntry(name, input, output, isComponent = true) {
    const exports = name === 'primereact.api' || name === 'primereact' ? 'named' : 'auto';
    const useCorePlugin = !NPM_LINK && ALIAS_COMPONENT_ENTRIES.some((entry) => entry.replacement === name.replaceAll('.', '/'));
    const plugins = isComponent ? PLUGINS_COMPONENT : PLUGINS;
    const external = isComponent ? EXTERNAL_COMPONENT : EXTERNAL;
    const inlineDynamicImports = true;

    const onwarn = (warning) => {
        if (warning.code === 'MODULE_LEVEL_DIRECTIVE') {
            return;
        }
    };

    const getEntry = (isMinify) => {
        return {
            onwarn,
            input,
            plugins: [...plugins, isMinify && terser(TERSER_PLUGIN_OPTIONS), useCorePlugin && corePlugin()],
            external,
            inlineDynamicImports
        };
    };

    const get_CJS_ESM = (isMinify) => {
        return {
            ...getEntry(isMinify),
            output: [
                ...(NPM_LINK
                    ? []
                    : [
                          {
                              format: 'cjs',
                              file: `${output}.cjs${isMinify ? '.min' : ''}.js`,
                              exports,
                              banner: "'use client';" // This line is required for SSR.
                          }
                      ]),
                {
                    format: 'esm',
                    file: `${output}.esm${isMinify ? '.min' : ''}.js`,
                    exports,
                    banner: "'use client';" // This line is required for SSR.
                }
            ]
        };
    };

    const get_IIFE = (isMinify) => {
        return {
            ...getEntry(isMinify),
            output: [
                {
                    format: 'iife',
                    name,
                    file: `${output}${isMinify ? '.min' : ''}.js`,
                    globals: isComponent ? GLOBAL_COMPONENT_DEPENDENCIES : GLOBAL_DEPENDENCIES,
                    exports
                }
            ]
        };
    };

    entries.push(get_CJS_ESM());

    if (!NPM_LINK) {
        entries.push(get_IIFE());

        // Minify
        entries.push(get_CJS_ESM(true));
        entries.push(get_IIFE(true));
    }
}

function corePlugin() {
    return {
        name: 'corePlugin',
        generateBundle(outputOptions, bundle) {
            const { name, format } = outputOptions;

            if (format === 'iife') {
                Object.keys(bundle).forEach((id) => {
                    const chunk = bundle[id];
                    const folderName = name.replace('primereact.', '').replaceAll('.', '/');
                    const filePath = `./dist/core/core${id.indexOf('.min.js') > 0 ? '.min.js' : '.js'}`;

                    core[filePath] ? (core[filePath][folderName] = chunk.code) : (core[filePath] = { [`${folderName}`]: chunk.code });
                });
            }
        }
    };
}

function addCore() {
    const lastEntry = entries[entries.length - 1];

    lastEntry.plugins = [
        ...lastEntry.plugins,
        {
            name: 'coreMergePlugin',
            generateBundle() {
                Object.entries(core).forEach(([filePath, value]) => {
                    const code = ALIAS_COMPONENT_ENTRIES.reduce((val, entry) => {
                        // const name = entry.replacement.replace('primereact/', '');
                        const name = entry.replacement.replace('primereactnew/dist/', '');

                        val += value[name] + '\n';

                        return val;
                    }, '');

                    fs.outputFile(path.resolve(__dirname, filePath), code, {}, function (err) {
                        if (err) {
                            // eslint-disable-next-line no-console
                            return console.error(err);
                        }
                    });
                });
            }
        }
    ];
}

function addComponent() {
    fs.readdirSync(path.resolve(__dirname, process.env.INPUT_DIR), { withFileTypes: true })
        .filter((dir) => dir.isDirectory())
        .forEach(({ name: folderName }) => {
            fs.readdirSync(path.resolve(__dirname, process.env.INPUT_DIR + folderName)).forEach((file) => {
                const name = file.split(/(.js)$/)[0].toLowerCase();

                if (name === folderName) {
                    const input = process.env.INPUT_DIR + folderName + '/' + file;
                    const output = process.env.OUTPUT_DIR + folderName + '/' + name;

                    addEntry('primereact.' + folderName, input, output, true);
                }
            });
        });
}

function addIcon() {
    const iconDir = path.resolve(__dirname, process.env.INPUT_DIR + 'icons');

    fs.readdirSync(path.resolve(__dirname, iconDir), { withFileTypes: true })
        .filter((dir) => dir.isDirectory())
        .forEach(({ name: folderName }) => {
            fs.readdirSync(path.resolve(__dirname, iconDir + '/' + folderName)).forEach((file) => {
                if (/\.js$/.test(file)) {
                    const name = file.split(/(.js)$/)[0].toLowerCase();
                    const input = process.env.INPUT_DIR + 'icons/' + folderName + '/' + file;
                    const output = process.env.OUTPUT_DIR + 'icons/' + folderName + '/' + name;

                    addEntry('primereact.icons.' + folderName, input, output, true);
                }
            });
        });
}

function addPassThrough() {
    const inputDir = process.env.INPUT_DIR + 'passthrough';
    const outputDir = process.env.OUTPUT_DIR + 'passthrough';

    addEntry('passthrough', `${inputDir}/index.js`, `${outputDir}/index`, false);
    addEntry('passthrough.tailwind', `${inputDir}/tailwind/index.js`, `${outputDir}/tailwind/index`, false);
}

function addPrimeReact() {
    const input = process.env.INPUT_DIR + 'primereact.all.js';
    const output = process.env.OUTPUT_DIR + 'primereact.all';

    addEntry('primereact', input, output, false);
}

function addPackageJson() {
    const outputDir = path.resolve(__dirname, process.env.OUTPUT_DIR);
    const packageJson = `{
    "name": "primereactnew",
    "version": "${pkg.version}",
    "private": false,
    "author": "PrimeTek Informatics",
    "description": "PrimeReact is an open source UI library for React featuring a rich set of 90+ components, a theme designer, various theme alternatives such as Material, Bootstrap, Tailwind, premium templates and professional support. In addition, it integrates with PrimeBlock, which has 370+ ready to use UI blocks to build spectacular applications in no time.",
    "homepage": "https://www.primereact.org",
    "repository": {
        "type": "git",
        "url": "https://github.com/primefaces/primereact.git"
    },
    "license": "MIT",
    "bugs": {
        "url": "https://github.com/primefaces/primereact/issues"
    },
    "keywords": [
        "primereact",
        "react",
        "hooks",
        "next",
        "nextjs",
        "ui-kit",
        "ui library",
        "component library",
        "material",
        "material design",
        "bootstrap",
        "tailwind theme",
        "dark theme",
        "react components",
        "responsive components"
    ],
    "unpkg": "primereact.all.min.js",
    "jsdelivr": "primereact.all.min.js",
    "main": "primereact.all.min.js",
    "module": "primereact.all.esm.min.js",
    "web-types": "web-types.json",
    "peerDependencies": {
        "@types/react": "^17.0.0 || ^18.0.0 || ^19.0.0",
        "react": "^17.0.0 || ^18.0.0 || ^19.0.0",
        "react-dom": "^17.0.0 || ^18.0.0 || ^19.0.0"
    },
    "peerDependenciesMeta": {
        "@types/react": {
            "optional": true
        }
    },
    "dependencies": {
        "@types/react-transition-group": "^4.4.1",
        "react-transition-group": "^4.4.1"
    },
    "sideEffects": [
        "**/*.css"
    ],
    "engines": {
        "node": ">=14.0.0"
    }
}`;

    !fs.existsSync(outputDir) && fs.mkdirSync(outputDir);
    fs.writeFileSync(path.resolve(outputDir, 'package.json'), packageJson);
}

addIcon();
addComponent();
addPrimeReact();
addPassThrough();
addCore();
addPackageJson();

export default entries;
