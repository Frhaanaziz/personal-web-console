'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { languageOptions } from '@/lib/constant';
import { useCallback } from 'react';

const AsideConfig = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const locale = searchParams.get('locale') || 'en';

  const createQueryString: any = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  function onSelectChange(locale: string) {
    const params = createQueryString('locale', locale);
    router.push(pathname + '?' + params, { scroll: false });
  }

  return (
    <aside>
      <div className="border rounded-xl p-6 sticky top-16 lg:top-8 min-w-min">
        <p className="text-lg font-semibold">Internationalization</p>

        <div className="mt-5 space-y-2">
          <p>Locales</p>
          <Select defaultValue={locale} onValueChange={onSelectChange}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {languageOptions.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value.toLowerCase()}
                >
                  {option.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {/* {locale !== 'en' && <Button className="w-full" onClick={handleFillForm}>Fill in with another locale</Button>} */}
        </div>
      </div>
    </aside>
  );
};

export default AsideConfig;
