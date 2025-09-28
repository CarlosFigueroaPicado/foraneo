module.exports = {
	preset: 'jest-expo',
	moduleNameMapper: {
		'^@components/(.*)$': '<rootDir>/src/components/$1',
		'^@config/(.*)$': '<rootDir>/src/config/$1',
		'^@theme/(.*)$': '<rootDir>/src/theme/$1',
		'^@services/(.*)$': '<rootDir>/src/services/$1',
		'^@hooks/(.*)$': '<rootDir>/src/hooks/$1',
		'^@store/(.*)$': '<rootDir>/src/store/$1',
		'^@types/(.*)$': '<rootDir>/src/types/$1',
		'^@utils/(.*)$': '<rootDir>/src/utils/$1'
	}
};
