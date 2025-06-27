// components/ProductTableFilters.js
import { Menu, MenuButton, MenuItem, MenuItems} from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

const Dropdown = ({ label, options, value, onChange }) => {
  const selectedLabel = options.find(opt => opt.value === value)?.label || label;

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton className="w-full h-12 flex justify-between col-span-1 items-center gap-2 hover:text-white rounded-md text-darker dark:text-white 
         bg-white dark:bg-dark 
         px-4 py-2 text-sm font-medium ring-1 ring-gray-700 hover:bg-gray-700">
          {selectedLabel}
          <ChevronDownIcon className="h-5 w-5 text-gray-300" aria-hidden="true" />
        </MenuButton>
      </div>

      <MenuItems className="absolute z-10 mt-2 w-56 rounded-md bg-gray-900 shadow-lg ring-1 ring-black/20 focus:outline-none">
        <div className="py-1">
          {options.map(option => (
            <MenuItem key={option.value}>
              {({ active }) => (
                <button
                  onClick={() => onChange(option.value)}
                  className={`w-full h-12 flex justify-between col-span-1 text-left px-4 py-2 text-sm ${
                    active ? 'bg-gray-700 text-white' : 'text-gray-300'
                  }`}
                >
                  {option.label}
                </button>
              )}
            </MenuItem>
          ))}
        </div>
      </MenuItems>

    </Menu>
  );
};

export const CategoryDropdown = ({ value, onChange, options }) => (
  <Dropdown
    label="All Categories"
    value={value}
    onChange={onChange}
    options={[{ label: 'All Categories', value: 'all' }, ...options]}
  />
);

export const SortByPriceDropdown = ({ value, onChange }) => (
  <Dropdown
    label="Sort by Price"
    value={value}
    onChange={onChange}
    options={[
      { label: 'Sort by Price', value: '' },
      { label: 'Price: Low to High', value: 'price_ASC' },
      { label: 'Price: High to Low', value: 'price_DESC' },
    ]}
  />
);

export const SortByDateDropdown = ({ value, onChange }) => (
  <Dropdown
    label="Sort by Date"
    value={value}
    onChange={onChange}
    options={[
      { label: 'Sort by Date', value: '' },
      { label: 'Newest First', value: 'date_DESC' },
      { label: 'Oldest First', value: 'date_ASC' },
    ]}
  />
);
