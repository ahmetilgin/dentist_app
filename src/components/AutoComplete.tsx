import { QueryResult } from '@/DataTypes';
import { Loader2 } from 'lucide-react';
import { observer } from 'mobx-react';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from './ui/input';
import { Label } from './ui/label';

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

	useEffect(() => {
		fetchOptions(inputValue.length == 0 ? '-' : inputValue).then((result) => {
			setData(result);
			setIsLoading(false);
		});
	}, [inputValue, fetchOptions]);

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
			<Label  className="text-md font-medium mb-1">
				{t(label)}
			</Label>
			<div className="relative">
				{icon}
				<Input
					className="pl-8"
					onChange={(e) => {
						onValueChanged(e.target.value);
						setInputValue(e.target.value);
						setIsOpen(true);
					}}
					value={inputValue}
					placeholder={t(placeholder ?? '')}
				/>
				{isLoading && (
					<div className="absolute right-2 top-1/2 transform -translate-y-1/2">
						<Loader2 className="h-4 w-4 animate-spin " />
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
							className="backdrop-blur-sm hover:bg-ring p-2 cursor-pointer w-full text-left"
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
