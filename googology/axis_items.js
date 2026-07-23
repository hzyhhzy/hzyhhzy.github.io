// Geometry and styling only. Localized labels and details live in
// locales/<locale>/interface.js and are joined by stable IDs at runtime.
const branchNames = Object.freeze({
    1: Object.freeze({ id: 'branch-1', branch: 1 }),
    2: Object.freeze({ id: 'branch-2', branch: 2 }),
    3: Object.freeze({ id: 'branch-3', branch: 3 }),
    4: Object.freeze({ id: 'branch-4', branch: 4 })
});

const axisSegments = Object.freeze([
    { id: 'axis-00', start: 0, end: 1, bg: '#ADD8E6', color: '#000' },
    { id: 'axis-01', start: 1, end: 2, bg: '#87CEEB', color: '#000' },
    { id: 'axis-02', start: 2, end: 3, bg: '#90EE90', color: '#000' },
    { id: 'axis-03', start: 3, end: 4, bg: '#FFD700', color: '#000' },
    { id: 'axis-04', start: 4, end: 5, bg: '#FF6000', color: '#000' },
    { id: 'axis-05', start: 5, end: 6, bg: '#C00000', color: '#fff' },
    { id: 'axis-06', start: 6, end: 6.75, bg: '#000', color: '#fff' },
    { id: 'axis-07', start: 9.5, end: 12, bg: '#666', color: '#fff' }
].map(Object.freeze));

const axisSubSegments = Object.freeze([
    {
        id: 'subaxis-00',
        start: 0,
        end: 0.5,
        bg: '#C2E2EC',
        color: '#000'
    },
    {
        id: 'subaxis-01',
        start: 0.5,
        end: 1,
        bg: '#A4D6E7',
        color: '#000'
    },
    {
        id: 'subaxis-02',
        start: 1,
        end: 1.5,
        bg: '#91D1EA',
        color: '#000'
    },
    {
        id: 'subaxis-03',
        start: 1.5,
        end: 2,
        bg: '#89D6D4',
        color: '#000'
    },
    {
        id: 'subaxis-04',
        start: 2,
        end: 2.5,
        bg: '#8EE6A7',
        color: '#000'
    },
    {
        id: 'subaxis-05',
        start: 2.5,
        end: 3,
        bg: '#ACE86C',
        color: '#000'
    },
    {
        id: 'subaxis-06',
        start: 3,
        end: 3.5,
        bg: '#E3DD24',
        color: '#000'
    },
    {
        id: 'subaxis-07',
        start: 3.5,
        end: 4,
        bg: '#FFB900',
        color: '#000'
    },
    {
        id: 'subaxis-08',
        start: 4,
        end: 4.5,
        bg: '#FF7E00',
        color: '#000'
    },
    {
        id: 'subaxis-09',
        start: 4.5,
        end: 5,
        bg: '#EF4800',
        color: '#000'
    },
    {
        id: 'subaxis-10',
        start: 5,
        end: 5.5,
        bg: '#D01800',
        color: '#fff'
    },
    {
        id: 'subaxis-11',
        start: 5.5,
        end: 6,
        bg: '#900000',
        color: '#fff'
    }
].map(Object.freeze));
