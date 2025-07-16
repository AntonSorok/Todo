import {renderHook, act} from '@testing-library/react'
import {useLocalStorage} from '../useLocalStorage.ts'


describe('useLocalStorage', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it('инициализируется значением из localStorage, если есть', () => {
        localStorage.setItem('test', JSON.stringify(42));
        const {result} = renderHook(() => useLocalStorage('test', 0));
        expect(result.current[0]).toBe(42);
    });

    it('записывает в localStorage при изменении', () => {
        const {result} = renderHook(() => useLocalStorage('foo', 'bar'));
        act(() => {
            result.current[1]('baz');
        });
        expect(localStorage.getItem('foo')).toBe(JSON.stringify('baz'));
        expect(result.current[0]).toBe('baz')
    })
})


// src/hooks/__tests__/useLocalStorage.test.ts
// import { renderHook, act } from '@testing-library/react';
// import { useLocalStorage } from '../useLocalStorage';
// import '@testing-library/jest-dom'; // чтобы Jest знал про расширения матчеров
//
// describe('useLocalStorage', () => {
//     beforeEach(() => {
//         localStorage.clear();
//     });
//
//     it('инициализируется initialValue, если в localStorage нет значения', () => {
//         const { result } = renderHook(() => useLocalStorage('myKey', 123));
//         // result.current — это [value, setValue]
//         expect(result.current[0]).toBe(123);
//     });
//
//     it('берёт значение из localStorage, если там что-то есть', () => {
//         localStorage.setItem('foo', JSON.stringify('bar'));
//         const { result } = renderHook(() => useLocalStorage('foo', 'init'));
//         expect(result.current[0]).toBe('bar');
//     });
//
//     it('при изменении сеттера обновляет state и localStorage', () => {
//         const { result } = renderHook(() => useLocalStorage('count', 0));
//
//         act(() => {
//             // вызываем setValue(5)
//             result.current;
//         });
//
//         // проверяем, что value в хукe поменялся
//         expect(result.current[0]).toBe(5);
//         // и localStorage тоже
//         expect(localStorage.getItem('count')).toBe(JSON.stringify(5));
//     });
// });
