import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Chip, emphasize, styled } from '@mui/material';
import { BreadCrumbChild } from '../../types/supportUI';

interface BreadcrumbsHk2tProps {
    listBreadcrumbs: BreadCrumbChild[];
}

export default function BreadcrumbsHk2t({ listBreadcrumbs } : BreadcrumbsHk2tProps) {
    function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
      event.preventDefault();
      console.info('You clicked a breadcrumb.');
    }

    const StyledBreadcrumb = styled(Chip)(({ theme }) => {
        const backgroundColor =
          theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[800];
        return {
          backgroundColor,
          height: theme.spacing(3),
          color: theme.palette.text.primary,
          fontWeight: theme.typography.fontWeightRegular,
          '&:hover, &:focus': {
            cursor: 'pointer',
            backgroundColor: emphasize(backgroundColor, 0.06),
          },
          '&:active': {
            boxShadow: theme.shadows[1],
            backgroundColor: emphasize(backgroundColor, 0.12),
          },
        };
    }) as typeof Chip;

    return (
        <div role="presentation" onClick={handleClick}>
            <Breadcrumbs aria-label="breadcrumb">
                {listBreadcrumbs.map((breadcrumb, index) => {
                    if(index === listBreadcrumbs.length - 1){
                        return (
                            <Typography 
                                fontWeight="bold"
                                fontSize="0.8125rem" 
                            >{breadcrumb.label}</Typography>
                        )
                    }
                    return (
                        <StyledBreadcrumb
                            component="a" // chip same as <a href="" />
                            href={breadcrumb.href}
                            label={breadcrumb.label}
                            icon={breadcrumb.icon}
                        />
                    )
                })}
            </Breadcrumbs>
        </div>
    )
}
