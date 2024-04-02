'use client';
 
import { TextField } from '@mui/material';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

type SearchProps = {
    placeholder: string;
};
 
export default function Search(props: SearchProps) {
    const { placeholder } = props;
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
 
    function handleSearch(query: string) {
        const params = new URLSearchParams(searchParams);
        if (query) {
            params.set('query', query);
        } else {
            params.delete('query');
        }
        replace(`${pathname}?${params.toString()}`);
    }

    return (
        <TextField
            className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
            placeholder={placeholder}
            onChange={(e) => {
                handleSearch(e.target.value);
            }}
            defaultValue={searchParams.get('query')?.toString()}
        />
    );
}