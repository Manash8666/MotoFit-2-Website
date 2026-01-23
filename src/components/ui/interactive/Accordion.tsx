'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

interface AccordionItem {
    id: string;
    title: string;
    content: React.ReactNode;
    icon?: React.ReactNode;
}

interface AccordionProps {
    items: AccordionItem[];
    variant?: 'default' | 'bordered' | 'minimal';
    multiple?: boolean;
    className?: string;
}

export function Accordion({
    items,
    variant = 'default',
    multiple = false,
    className
}: AccordionProps) {
    const [openItems, setOpenItems] = useState<string[]>([]);

    const toggleItem = (id: string) => {
        if (multiple) {
            setOpenItems(prev =>
                prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
            );
        } else {
            setOpenItems(prev => (prev.includes(id) ? [] : [id]));
        }
    };

    const variants = {
        default: 'space-y-2',
        bordered: 'border border-[#1a1a1a] divide-y divide-[#1a1a1a] rounded-lg',
        minimal: 'space-y-1',
    };

    const itemVariants = {
        default: 'bg-[#0a0a0a] rounded-lg p-4',
        bordered: 'p-4',
        minimal: '',
    };

    return (
        <div className={cn(variants[variant], className)}>
            {items.map((item) => {
                const isOpen = openItems.includes(item.id);

                return (
                    <div key={item.id} className={cn(itemVariants[variant])}>
                        <button
                            onClick={() => toggleItem(item.id)}
                            className={cn(
                                'flex items-center justify-between w-full text-left',
                                'transition-colors duration-200',
                                variant !== 'minimal' && 'hover:text-white'
                            )}
                        >
                            <div className="flex items-center gap-3">
                                {item.icon}
                                <span className="font-semibold">{item.title}</span>
                            </div>

                            <ChevronDown className={cn(
                                'h-5 w-5 transition-transform duration-300',
                                isOpen && 'rotate-180'
                            )} />
                        </button>

                        <div
                            className={cn(
                                'grid transition-all duration-300 ease-in-out',
                                isOpen ? 'grid-rows-[1fr] mt-4' : 'grid-rows-[0fr]'
                            )}
                        >
                            <div className="overflow-hidden">
                                <div className="text-[#999999] text-sm leading-relaxed">
                                    {item.content}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
