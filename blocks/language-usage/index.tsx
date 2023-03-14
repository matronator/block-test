import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { FolderBlockProps } from '@githubnext/blocks';
import { Box } from '@primer/react';

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
    labels: [] as string[],
    datasets: [] as PieDataset[],
};

interface PieDataset {
    label: string;
    data: number[];
    backgroundColor: string[];
    borderColor: string[];
    borderWidth: number;
}

type PieDatasetData = {
    lang: string;
    count: number;
}

export default function LanguageUsage(props: FolderBlockProps) {

    const datasets = [] as PieDatasetData[];

    function addLang(lang: string, long: string) {
        if (!data.labels.includes(long)) {
            data.labels.push(long);
        }
        if (!datasets.find((dataset) => dataset.lang === lang)) {
            datasets.push({
                lang: lang,
                count: 1,
            });
        } else {
            datasets.find((dataset) => dataset.lang === lang)!.count += 1;
        }
    }

    props.tree.map((item, index) => {
        if (item.type !== 'blob') {
            return;
        }

        const extension = item.path?.split('.').pop();
        switch (extension) {
            case 'js':
            case 'jsx':
                addLang('js', 'JavaScript');
                break;
            case 'ts':
            case 'tsx':
                addLang('ts', 'TypeScript');
                break;
            case 'md':
            case 'markdown':
                addLang('md', 'Markdown');
                break;
            case 'css':
                addLang('css', 'CSS');
                break;
            case 'json':
                addLang('json', 'JSON');
                break;
            case 'txt':
                addLang('txt', 'Text file');
                break;
            case 'yaml':
                addLang('yaml', 'YAML');
                break;
        }
    });

    data.datasets.push({
        label: '',
        data: [],
        backgroundColor: [],
        borderColor: [],
        borderWidth: 0,
    });

    datasets.forEach((dataset) => {
        data.datasets[0].data.push(dataset.count);
        data.datasets[0].backgroundColor.push('#' + Math.floor(Math.random() * 16777215).toString(16));
    });
    data.datasets[0].label = 'Languages used';
    data.datasets[0].borderWidth = 1;

    return (
        <Box p={4}>
            <Box
                borderColor="border.default"
                borderWidth={1}
                borderStyle="solid"
                borderRadius={6}
                overflow="hidden"
            >
                <Box p={4}>
                    <Pie data={data} />
                </Box>
            </Box>
        </Box>
    );
}
