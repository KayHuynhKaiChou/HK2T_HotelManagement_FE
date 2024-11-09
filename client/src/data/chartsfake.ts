let datasetMonthTypeRoom = [
    {
      month: 'Sep',
      2: 8,
      3: 2,
      4: 3
    },
    {
      month: 'Oct',
      2: 5,
      3: 10,
      4: 2
    },
    {
      month: 'Nov',
      2: 5,
      3: 12,
      4: 9
    },
    {
      month: 'Dec',
      2: 7,
      3: 10,
      4: 9
    }
  ];

  let datasetQuarterTypeRoom = [
    {
      quarter: 'quarter 1',
      2: 15,
      3: 20,
      4: 19
    },
    {
      quarter: 'quarter 2',
      2: 25,
      3: 20,
      4: 21
    },
    {
      quarter: 'quarter 3',
      2: 15,
      3: 20,
      4: 21
    }
  ];

  let datasetMonthRevenue = [
    {
      month: 'Sep',
      total_revenue: 3292000
    },
    {
      month: 'Oct',
      total_revenue: 1250000
    },
    {
      month: 'Nov',
      total_revenue: 1050000
    },
    {
      month: 'Dec',
      total_revenue: 978000
    }
  ];

  let datasetQuarterRevenue = [
    {
      quarter: 'Quarter 2',
      total_revenue: 6192000
    },
    {
      quarter: 'Quarter 3',
      total_revenue: 3250000
    },
    {
      quarter: 'Quarter 4',
      total_revenue: 5050000
    }
  ];
  

//   let series = typeRooms.filter(tr => [2,3,4].includes(tr.id || 0)).map(tr => ({
//     dataKey: tr.id,
//     label: tr.title,
//     valueFormatter,
//     color: 'red'
//     // stack: "stackKey"
//   }))

//   let seriesRevenue = [{
//     dataKey: 'total_revenue',
//     label: 'total revenue',
//     valueFormatter
//     // stack: "stackKey"
//   }]