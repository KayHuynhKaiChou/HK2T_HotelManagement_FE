import {Stack, styled} from "@mui/material";
import Paper from "@mui/material/Paper";

interface StackHk2tProps {
    list : any[];
    backgroundColorItem?: string;
    spacing?: number;
    direction?: 'row' | 'column';
}

function StackHk2T({
    list,
    backgroundColorItem = '#fff',
    spacing = 2,
    direction = 'column',
} : StackHk2tProps) {
    
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: backgroundColorItem,
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        ...theme.applyStyles('dark', {
            backgroundColor: '#1A2027',
        }),
    }));
    
    return (
        <Stack spacing={spacing} direction={direction}>
            {list.map(item => (
                <Item>{item}</Item>
            ))}
        </Stack>
    );
}

export default StackHk2T;