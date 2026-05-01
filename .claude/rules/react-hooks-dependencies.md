# React Hooks Dependency Rules

## useMemo and useEffect Dependencies

### ❌ NEVER use API response objects directly in dependency arrays

**Bad:**

```typescript
const filteredData = useMemo(() => {
  if (searchTerm) {
    return searchResults;
  }
  return apiData;
}, [searchTerm, searchResults, apiData]); // ❌ WRONG - causes unnecessary re-renders
```

### ✅ ALWAYS use dataUpdatedAt from React Query hooks

**Good:**

```typescript
const {
  data: apiData,
  dataUpdatedAt: apiDataUpdatedAt
} = useQuery(...);

const {
  data: searchResults,
  dataUpdatedAt: searchDataUpdatedAt
} = useQuery(...);

const filteredData = useMemo(() => {
  if (searchTerm) {
    return searchResults;
  }
  return apiData;
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [searchTerm, searchDataUpdatedAt, apiDataUpdatedAt]); // ✅ CORRECT
```

## Key Points

1. **Always destructure `dataUpdatedAt`** from React Query hooks (useQuery, useMutation)
2. **Use `dataUpdatedAt` in dependencies** instead of the actual data objects
3. **Add eslint-disable comment** before the dependency array when intentionally omitting dependencies
4. **Prevents unnecessary re-renders** - dataUpdatedAt only changes when data actually updates, not on every render
5. **Consistent naming** - if you have multiple queries, rename to `xxxDataUpdatedAt` for clarity

## Why?

- API response objects are new references on every render even if the data hasn't changed
- This causes useMemo/useEffect/useCallback to run unnecessarily
- `dataUpdatedAt` is a timestamp that only changes when data actually updates
- This provides stable dependency tracking while still responding to data changes
