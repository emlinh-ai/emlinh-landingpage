// Local ESLint configuration for development
// This file extends the main ESLint config with some relaxations for 3D components

module.exports = {
  extends: ['./eslint.config.js'],
  rules: {
    // Allow some flexibility for 3D components
    '@typescript-eslint/no-explicit-any': 'warn',
    'react-hooks/exhaustive-deps': 'warn',
    'react-hooks/set-state-in-effect': 'warn',
    'react-hooks/purity': 'warn',
    'react-hooks/immutability': 'warn',
  },
  overrides: [
    {
      files: ['src/components/CustomVRMModel.tsx'],
      rules: {
        // Disable strict rules for the VRM controller since it's a complex 3D library
        '@typescript-eslint/no-explicit-any': 'off',
        'react-hooks/exhaustive-deps': 'off',
        'react-hooks/set-state-in-effect': 'off',
      }
    },
    {
      files: ['src/components/ParticleField.tsx', 'src/components/ZodiacCircle.tsx'],
      rules: {
        // Allow some flexibility for particle systems
        'react-hooks/purity': 'off',
        'react-hooks/immutability': 'warn',
      }
    }
  ]
};
