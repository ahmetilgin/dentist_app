import { Button } from '@/components/ui/button';
import { NavigationMenuLink } from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import * as React from 'react';

const ListItem = React.forwardRef<React.ElementRef<'a'>, React.ComponentPropsWithoutRef<'a'>>(
	({ className, title, children, ...props }, ref) => {
		return (
			<li>
				<NavigationMenuLink asChild>
					<a
						ref={ref}
						className={cn(
							'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
							className
						)}
						{...props}
					>
						<div className="text-sm font-medium leading-none">{title}</div>
						<p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
					</a>
				</NavigationMenuLink>
			</li>
		);
	}
);
ListItem.displayName = 'ListItem';

export function NavigationBar() {
	return (
		<div className="w-full border-b static">
			<div className="p-5 mx-auto py-4">
				<div className="flex items-center justify-between">
					<div className="flex items-center space-x-2">
						<h1 className="text-2xl font-bold">Karriere</h1>
					</div>
					<div className="flex items-center space-x-2">
						<Button>Giriş Yap / Üye Ol</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
