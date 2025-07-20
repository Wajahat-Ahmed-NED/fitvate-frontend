import React,{useState, useEffect} from 'react';
import { Users, UserPlus, TrendingUp, DollarSign, Crown } from 'lucide-react';
import { StatsCard } from './StatsCard';
import { Chart } from '../Charts/Chart';
import { dailyActiveUsers, dailyNewUsers } from '../../api/adminPanelAPI';
import Swal from 'sweetalert2';

export const Dashboard: React.FC = () => {

  const [activeUser, setActiveUser] = useState(0);
  const [dailyUser, setDailyUser] = useState(0);

  useEffect(() => {
    dailyActiveUsers().then((res) => {
      if (res.status == 200) {
        const activeUsers = res.data["Active Users"];
        setActiveUser(activeUsers)
      }
    }).catch((err) => {
      Swal.fire({
        title: 'Error!',
        text: `${err.data.message}`,
        timer: 5000,
        icon: 'error',
        width: '300px',
        padding: '1rem',
        customClass: {
          popup: 'p-4 rounded-md shadow-md',
          title: 'text-lg font-semibold',
          htmlContainer: 'text-sm',
          confirmButton: 'bg-blue-600 shadow-lg hover:bg-blue-700 text-white px-4 py-2 rounded',
        },
        confirmButtonText: 'Okay',
        buttonsStyling: false, // required to use Tailwind styles
      })
    });
    dailyNewUsers().then((res) => {
      if (res.status == 200) {
        const newUsers = res.data["New Users"];
        setDailyUser(newUsers)
      }
    }).catch((err) => {
      Swal.fire({
        title: 'Error!',
        text: `${err.data.message}`,
        timer: 5000,
        icon: 'error',
        width: '300px',
        padding: '1rem',
        customClass: {
          popup: 'p-4 rounded-md shadow-md',
          title: 'text-lg font-semibold',
          htmlContainer: 'text-sm',
          confirmButton: 'bg-blue-600 shadow-lg hover:bg-blue-700 text-white px-4 py-2 rounded',
        },
        confirmButtonText: 'Okay',
        buttonsStyling: false, // required to use Tailwind styles
      })
    });
  }, []);

  const stats = [
    {
      title: 'Daily Active Users',
      value: activeUser || 0,
      change: '+12% from yesterday',
      changeType: 'positive' as const,
      icon: Users,
      color: 'blue' as const,
    },
    {
      title: 'Users Today',
      value: dailyUser || 0,
      change: '+8% from yesterday',
      changeType: 'positive' as const,
      icon: UserPlus,
      color: 'green' as const,
    },
    {
      title: 'Total Revenue',
      value: '$45,231',
      change: '+23% from last month',
      changeType: 'positive' as const,
      icon: DollarSign,
      color: 'yellow' as const,
    },
    {
      title: 'Premium Users',
      value: '1,234',
      change: '+5% from last week',
      changeType: 'positive' as const,
      icon: Crown,
      color: 'purple' as const,
    },
  ];

  const userGrowthData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'New Users',
        data: [650, 590, 800, 810, 560, 550],
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 2,
      },
      {
        label: 'Active Users',
        data: [1200, 1900, 3000, 5000, 2000, 3000],
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        borderColor: 'rgb(16, 185, 129)',
        borderWidth: 2,
      },
    ],
  };

  const revenueData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Revenue ($)',
        data: [12000, 15000, 8000, 20000],
        backgroundColor: 'rgba(245, 158, 11, 0.8)',
        borderColor: 'rgb(245, 158, 11)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <StatsCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">User Growth</h3>
          <Chart type="line" data={userGrowthData} />
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Revenue</h3>
          <Chart type="bar" data={revenueData} />
        </div>
      </div> */}

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <Users className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="font-medium text-gray-900">New user registration</p>
                <p className="text-sm text-gray-600">john.doe@example.com joined</p>
              </div>
            </div>
            <span className="text-sm text-gray-500">2 minutes ago</span>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <Crown className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Premium subscription</p>
                <p className="text-sm text-gray-600">User upgraded to premium plan</p>
              </div>
            </div>
            <span className="text-sm text-gray-500">15 minutes ago</span>
          </div>
        </div>
      </div>
    </div>
  );
};