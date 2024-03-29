import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { IconButton, IconButtonProps } from '@mui/material';
import { useState } from 'react';
import copy from 'copy-text-to-clipboard';


type CopyToClipboardButtonProps = {
    toCopy: string | (() => string),
} & IconButtonProps

type CopyState = { icon: 'copy' | 'tick' | 'wrong' }

const Icons: Record<CopyState['icon'], React.ReactElement> = {
    copy: <ContentCopyIcon color='primary' fontSize='small' />,
    tick: <CheckCircleIcon color='success' fontSize='small' />,
    wrong: <CancelIcon color='error' fontSize='small' />,
}


const CopyToClipboardButton = ({ toCopy, ...rest }: CopyToClipboardButtonProps) => {

    const [state, setState] = useState<CopyState>({
        icon: 'copy',
    });

    const onClickHandler = async () => {
        let text = '';
        if (typeof toCopy == 'function') {
            text = toCopy();
        } else if (typeof toCopy == 'string') {
            text = toCopy;
        }
        try {
            await copy(text);
            setState(pre => ({ ...pre, icon: 'tick' }))
        } catch (error) {
            setState(pre => ({ ...pre, icon: 'wrong' }))
        } finally {
            setTimeout(() => {
                setState(pre => ({ ...pre, icon: 'copy' }))
            }, 1500);
        }
    }

    return (
        <IconButton
            {...rest}
            onClick={onClickHandler}
        >
            {Icons[state.icon]}
        </IconButton>
    )
}

export default CopyToClipboardButton