import { Rating } from "@mui/material";

interface RatingHk2tProps {
    name: "read-only" | "disabled" | "no-value";
    value: number;
}

export default function RatingHk2t({
    name,
    value
} : RatingHk2tProps) {
    return (
        <Rating 
            name={name} 
            value={name === 'no-value' ? null : value} 
            size="small"
            readOnly={name === 'read-only'}
            disabled={name === 'disabled'} 
        />
    )
}
