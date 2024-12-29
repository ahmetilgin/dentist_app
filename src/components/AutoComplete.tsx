import { QueryResult } from '@/DataTypes';
import { Loader2 } from 'lucide-react';
import { observer } from 'mobx-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from './ui/input';
import { Label } from './ui/label';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const debounce = <T extends (...args: any[]) => Promise<void>>(
	func: T,
	wait: number
): ((...args: Parameters<T>) => void) => {
	let timeout: NodeJS.Timeout;

	return (...args: Parameters<T>) => {
		clearTimeout(timeout);
		timeout = setTimeout(() => func(...args), wait);
	};
};

export type AutoCompleteProps = {
	onValueChanged: (value: string) => void;
	label: string;
	fetchOptions: (query: string) => Promise<QueryResult>;
	placeholder?: string;
	icon?: React.ReactNode;
};

const AutoComplete = observer(({ label, fetchOptions, onValueChanged, placeholder, icon }: AutoCompleteProps) => {
	const [inputValue, setInputValue] = useState('');
	const [isOpen, setIsOpen] = useState(false);
	const { t } = useTranslation();
	const containerRef = useRef<HTMLDivElement>(null);
	const [data, setData] = useState<QueryResult | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	const debouncedFetch = useCallback(
		async (value: string) => {
			setIsLoading(true);
			try {
				const result = await fetchOptions(value.length === 0 ? '-' : value);
				setData(result);
			} finally {
				setIsLoading(false);
			}
		},
		[fetchOptions]
	);
	useEffect(() => {
		const handler = debounce(async (value: string) => {
			await debouncedFetch(value);
		}, 300);
		handler(inputValue);
	}, [inputValue, debouncedFetch]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setInputValue(value);
		setIsOpen(true);
	};

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		}

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [containerRef]);

	return (
		<div className="flex flex-col relative w-full" ref={containerRef}>
			<Label className="text-md font-medium mb-1">{t(label)}</Label>
			<div className="relative">
				{icon && <div className="absolute left-2 top-1/2 transform -translate-y-1/2">{icon}</div>}
				<Input
					className={`${icon ? 'pl-8' : ''}`}
					onChange={handleInputChange}
					value={inputValue}
					placeholder={t(placeholder ?? '')}
				/>
				{isLoading && (
					<div className="absolute right-2 top-1/2 transform -translate-y-1/2">
						<Loader2 className="h-4 w-4 animate-spin" />
					</div>
				)}
			</div>
			{isOpen && data && data.query_result && data.query_result.length > 0 && (
				<div className="absolute z-20 w-full top-full left-0 mt-1  rounded-md shadow-lg max-h-60 overflow-auto divide-y">
					{data.query_result.map((item: string) => (
						<button
							key={item}
							onClick={() => {
								onValueChanged(item);
								setInputValue(item);
								setIsOpen(false);
							}}
							className="bg-secondary hover:bg-ring p-2 cursor-pointer w-full text-left"
						>
							{item}
						</button>
					))}
				</div>
			)}
		</div>
	);
});
export default AutoComplete;
