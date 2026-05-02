// Example usage of Input component with icons and variants

import { Input } from "@app/components/ui/input";
import AppInput from "@app/components/AppInput";
import { SearchNormal1, User, Lock } from "iconsax-react";

export const InputExamples = () => {
  return (
    <div className="space-y-6 p-8">
      <h2 className="text-h2 font-bold text-text-primary">Input Examples</h2>

      {/* Basic Input - Default variant */}
      <div>
        <h3 className="text-sm font-semibold mb-2">Default Input</h3>
        <Input placeholder="Enter text..." />
      </div>

      {/* Input with Left Icon */}
      <div>
        <h3 className="text-sm font-semibold mb-2">Input with Left Icon</h3>
        <Input
          placeholder="Search..."
          leftIcon={<SearchNormal1 size={18} color="#1283ae" />}
        />
      </div>

      {/* Input with Right Icon */}
      <div>
        <h3 className="text-sm font-semibold mb-2">Input with Right Icon</h3>
        <Input
          placeholder="Username"
          rightIcon={<User size={18} color="#666666" />}
        />
      </div>

      {/* Input with Both Icons */}
      <div>
        <h3 className="text-sm font-semibold mb-2">Input with Both Icons</h3>
        <Input
          placeholder="Search users..."
          leftIcon={<SearchNormal1 size={18} color="#1283ae" />}
          rightIcon={<User size={18} color="#666666" />}
        />
      </div>

      {/* Primary Variant (white background) */}
      <div>
        <h3 className="text-sm font-semibold mb-2">Primary Variant</h3>
        <Input
          variant="primary"
          placeholder="White background"
          leftIcon={<User size={18} color="#1283ae" />}
        />
      </div>

      {/* Filled Variant (dark background) */}
      <div className="bg-bg-sidebar p-4 rounded-md">
        <h3 className="text-sm font-semibold mb-2 text-text-white">
          Filled Variant (for dark backgrounds)
        </h3>
        <Input
          variant="filled"
          placeholder="Dark background"
          leftIcon={<Lock size={18} color="#dddddd" />}
        />
      </div>

      {/* Error State */}
      <div>
        <h3 className="text-sm font-semibold mb-2">Error State</h3>
        <Input
          placeholder="Enter password"
          hasError
          leftIcon={<Lock size={18} color="#ef4444" />}
        />
      </div>

      {/* AppInput with Label and Helper Text */}
      <div>
        <h3 className="text-sm font-semibold mb-2">
          AppInput with Label & Helper
        </h3>
        <AppInput
          label="Email Address"
          placeholder="your.email@example.com"
          helperText="We'll never share your email"
          leftIcon={<User size={18} color="#1283ae" />}
        />
      </div>

      {/* AppInput with Error */}
      <div>
        <h3 className="text-sm font-semibold mb-2">AppInput with Error</h3>
        <AppInput
          label="Password"
          type="password"
          placeholder="Enter password"
          hasError
          helperText="Password must be at least 8 characters"
          leftIcon={<Lock size={18} color="#ef4444" />}
        />
      </div>

      {/* Different Variants Side by Side */}
      <div>
        <h3 className="text-sm font-semibold mb-2">All Variants</h3>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-xs text-text-secondary mb-1">Default</p>
            <Input variant="default" placeholder="Default" />
          </div>
          <div>
            <p className="text-xs text-text-secondary mb-1">Primary</p>
            <Input variant="primary" placeholder="Primary" />
          </div>
          <div className="bg-bg-sidebar p-2 rounded">
            <p className="text-xs text-text-white mb-1">Filled</p>
            <Input variant="filled" placeholder="Filled" />
          </div>
        </div>
      </div>
    </div>
  );
};
